import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function useTracker() {
  const pathname = usePathname();
  const trackedPaths = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Only track a page view once per path per session to avoid spam on re-renders
    if (pathname && !trackedPaths.current.has(pathname)) {
      trackedPaths.current.add(pathname);
      
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'page_view',
          referrer: document.referrer
        })
      }).catch(() => {});

      // Track product views specifically
      if (pathname.startsWith('/product/')) {
        const handle = pathname.split('/').pop();
        if (handle) {
          fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'product_view', id: handle })
          }).catch(() => {});
        }
      }
    }
  }, [pathname]);

  return null;
}
