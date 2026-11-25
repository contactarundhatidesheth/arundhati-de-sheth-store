import crypto from 'crypto';

interface InquiryData {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
    honeypot?: string;
    formLoadedAt?: number | string;
}

interface ValidationResult {
    isValid: boolean;
    isSpam: boolean;
    reason?: string;
}

// In-memory rate limiting map
// key: IP, value: { count: number, firstRequest: number, lastRequest: number }
const ipRateLimitMap = new Map<string, { count: number; firstRequest: number; lastRequest: number }>();

// In-memory deduplication cache
// key: hash of content, value: timestamp
const deduplicationCache = new Map<string, number>();

// Clean up maps periodically to prevent memory leaks
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 inquiries per IP in 15 mins
const MIN_REQUEST_INTERVAL_MS = 5 * 1000; // Minimum 5s between requests from same IP
const DEDUPLICATION_WINDOW_MS = 5 * 60 * 1000; // 5 minutes duplicate window

function cleanupCaches() {
    const now = Date.now();
    for (const [ip, entry] of ipRateLimitMap.entries()) {
        if (now - entry.lastRequest > RATE_LIMIT_WINDOW_MS) {
            ipRateLimitMap.delete(ip);
        }
    }
    for (const [hash, timestamp] of deduplicationCache.entries()) {
        if (now - timestamp > DEDUPLICATION_WINDOW_MS) {
            deduplicationCache.delete(hash);
        }
    }
}

/**
 * Check if the client IP is rate limited
 */
export function checkRateLimit(clientIp: string): { allowed: boolean; retryAfter?: number; reason?: string } {
    if (!clientIp || clientIp === 'unknown' || clientIp === '127.0.0.1') {
        return { allowed: true };
    }

    cleanupCaches();
    const now = Date.now();
    const record = ipRateLimitMap.get(clientIp);

    if (!record) {
        ipRateLimitMap.set(clientIp, { count: 1, firstRequest: now, lastRequest: now });
        return { allowed: true };
    }

    // Check minimum interval between requests (e.g. 5 seconds)
    if (now - record.lastRequest < MIN_REQUEST_INTERVAL_MS) {
        return { allowed: false, retryAfter: 5, reason: 'rapid_submission' };
    }

    // Check window
    if (now - record.firstRequest < RATE_LIMIT_WINDOW_MS) {
        if (record.count >= MAX_REQUESTS_PER_WINDOW) {
            const retryAfter = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - record.firstRequest)) / 1000);
            return { allowed: false, retryAfter, reason: 'rate_limit_exceeded' };
        }
        record.count += 1;
        record.lastRequest = now;
        return { allowed: true };
    }

    // Reset window
    ipRateLimitMap.set(clientIp, { count: 1, firstRequest: now, lastRequest: now });
    return { allowed: true };
}

/**
 * Check if the inquiry is an identical duplicate within 5 minutes
 */
export function isDuplicateInquiry(data: { email: string; name: string; message: string }): boolean {
    cleanupCaches();
    const normalized = `${data.email.toLowerCase().trim()}:${data.name.toLowerCase().trim()}:${data.message.trim().toLowerCase().slice(0, 100)}`;
    const hash = crypto.createHash('sha256').update(normalized).digest('hex');

    const now = Date.now();
    const existing = deduplicationCache.get(hash);

    if (existing && (now - existing) < DEDUPLICATION_WINDOW_MS) {
        return true;
    }

    deduplicationCache.set(hash, now);
    return false;
}

/**
 * Validate inquiry payload for bot signatures, honeypots, invalid emails, and gibberish
 */
export function validateInquiry(data: InquiryData): ValidationResult {
    const { name, email, message, honeypot, formLoadedAt } = data;

    // 1. Honeypot check: If the hidden honeypot field has any value, it was filled by an automated bot
    if (honeypot && typeof honeypot === 'string' && honeypot.trim().length > 0) {
        return { isValid: false, isSpam: true, reason: 'honeypot_triggered' };
    }

    // 2. Time-gate verification: Humans take at least 2.5 seconds to fill out Name, Email, Phone, and Message
    if (formLoadedAt) {
        const loadedTime = typeof formLoadedAt === 'string' ? parseInt(formLoadedAt, 10) : formLoadedAt;
        if (!isNaN(loadedTime)) {
            const elapsed = Date.now() - loadedTime;
            // Submitted under 2 seconds = automated bot fill
            if (elapsed < 2000) {
                return { isValid: false, isSpam: true, reason: 'submitted_too_fast' };
            }
            // Form loaded more than 2 days ago = stale bot session
            if (elapsed > 48 * 60 * 60 * 1000) {
                return { isValid: false, isSpam: true, reason: 'form_session_expired' };
            }
        }
    }

    // 3. Email validation
    if (!email || typeof email !== 'string') {
        return { isValid: false, isSpam: false, reason: 'missing_email' };
    }
    const trimmedEmail = email.trim().toLowerCase();
    
    // Check RFC-compliant format
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(trimmedEmail)) {
        return { isValid: false, isSpam: true, reason: 'malformed_email' };
    }
    // Reject consecutive dots (e.g., br.uno...tebay@gmail.com)
    if (/\.{2,}/.test(trimmedEmail)) {
        return { isValid: false, isSpam: true, reason: 'consecutive_dots_in_email' };
    }

    // 4. Name validation
    if (!name || typeof name !== 'string') {
        return { isValid: false, isSpam: false, reason: 'missing_name' };
    }
    const trimmedName = name.trim();
    if (trimmedName.length < 2 || trimmedName.length > 80) {
        return { isValid: false, isSpam: false, reason: 'invalid_name_length' };
    }

    // High-entropy random mixed-case string detection (e.g., OCGxfhXQmIeMxChbwZa)
    // If name is a single token >= 12 chars without spaces and contains multiple camel transitions:
    if (!trimmedName.includes(' ') && trimmedName.length >= 12) {
        const transitions = (trimmedName.match(/[a-z][A-Z]/g) || []).length;
        if (transitions >= 3) {
            return { isValid: false, isSpam: true, reason: 'random_casing_gibberish_name' };
        }
    }

    // 5. Message validation
    if (!message || typeof message !== 'string') {
        return { isValid: false, isSpam: false, reason: 'missing_message' };
    }
    const trimmedMessage = message.trim();
    if (trimmedMessage.length < 2) {
        return { isValid: false, isSpam: false, reason: 'message_too_short' };
    }

    // Single token gibberish message detection (e.g., souyQJALqbXpnpQNddwy, dOAWItwwnJCtUTHclXpJEhu)
    if (!trimmedMessage.includes(' ') && trimmedMessage.length >= 16) {
        return { isValid: false, isSpam: true, reason: 'single_token_gibberish_message' };
    }

    // Check for spam payload markers & SEO/crypto/spam links
    if (/viagra|cialis|crypto|forex|invest\s*in|telegram:\s*@|whatsapp\s*me\s*for|online\s*casino|poker\s*bonus|backlinks|seo\s*rank|guest\s*post|domain\s*authority|ranking\s*first\s*page|traffic\s*boost/i.test(trimmedMessage)) {
        return { isValid: false, isSpam: true, reason: 'spam_keywords' };
    }

    // Bots love inserting multiple external URLs into messages
    const urlMatches = trimmedMessage.match(/https?:\/\/[^\s]+/gi) || [];
    if (urlMatches.length > 1) {
        return { isValid: false, isSpam: true, reason: 'multiple_urls_detected' };
    }

    // Common disposable / burner email domains used by automated spam networks
    const DISPOSABLE_DOMAINS = [
        'mailinator.com', 'tempmail.com', 'guerrillamail.com', '10minutemail.com',
        'yopmail.com', 'trashmail.com', 'sharklasers.com', 'throwawaymail.com',
        'getairmail.com', 'dispostable.com', 'fakemailgenerator.com', 'mytemp.email',
        'burnermail.io', 'dropmail.me', 'temp-mail.org', 'crazymailing.com'
    ];
    const emailDomain = trimmedEmail.split('@')[1] || '';
    if (DISPOSABLE_DOMAINS.includes(emailDomain)) {
        return { isValid: false, isSpam: true, reason: 'disposable_email_domain' };
    }

    return { isValid: true, isSpam: false };
}

/**
 * Generate a cryptographically signed human challenge token for form submissions
 */
export function generateChallengeToken(): { challengeId: string; question: string; hash: string } {
    const num1 = Math.floor(Math.random() * 6) + 2; // 2..7
    const num2 = Math.floor(Math.random() * 5) + 1; // 1..5
    const answer = num1 + num2;
    const challengeId = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const secret = process.env.SUPABASE_SERVICE_ROLE_KEY || 'arundhati-atelier-secret-salt';
    const hash = crypto.createHmac('sha256', secret).update(`${challengeId}:${answer}`).digest('hex');

    return {
        challengeId,
        question: `What is ${num1} + ${num2}?`,
        hash
    };
}

/**
 * Verify human challenge answer against signed hash
 */
export function verifyChallengeAnswer(challengeId: string, answer: string | number, expectedHash: string): boolean {
    if (!challengeId || answer === undefined || answer === null || !expectedHash) return false;
    const secret = process.env.SUPABASE_SERVICE_ROLE_KEY || 'arundhati-atelier-secret-salt';
    const cleanAnswer = String(answer).trim();
    const computedHash = crypto.createHmac('sha256', secret).update(`${challengeId}:${cleanAnswer}`).digest('hex');
    return computedHash === expectedHash;
}
