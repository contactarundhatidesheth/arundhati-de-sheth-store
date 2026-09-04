const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '.data', 'db.json');
if (!fs.existsSync(dbPath)) {
    console.error('db.json not found');
    process.exit(1);
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
let sql = '';

function escapeSql(str) {
    if (str === null || str === undefined) return 'NULL';
    if (typeof str === 'boolean') return str ? 'true' : 'false';
    if (typeof str === 'number') return str;
    return "'" + String(str).replace(/'/g, "''") + "'";
}

function arrayToSql(arr) {
    if (!arr || !Array.isArray(arr) || arr.length === 0) return "'{}'";
    return "ARRAY[" + arr.map(escapeSql).join(',') + "]::text[]";
}

function jsonbToSql(obj) {
    if (!obj) return "'{}'::jsonb";
    return escapeSql(JSON.stringify(obj)) + "::jsonb";
}

// 1. Products
if (db.products && db.products.length > 0) {
    sql += "-- Migrate Products\n";
    for (const p of db.products) {
        sql += `INSERT INTO public.products (id, handle, title, description, price, compare_at_price, category, metal, collection, tags, images, specs, is_new, is_bespoke, is_price_on_request, in_stock, sequence) VALUES (${escapeSql(p.id)}, ${escapeSql(p.handle)}, ${escapeSql(p.title)}, ${escapeSql(p.description)}, ${p.price || 0}, ${p.compareAtPrice || 'NULL'}, ${escapeSql(p.category)}, ${escapeSql(p.metal)}, ${escapeSql(p.collection)}, ${arrayToSql(p.tags)}, ${arrayToSql(p.images)}, ${jsonbToSql(p.specs)}, ${p.isNew ? 'true' : 'false'}, ${p.isBespoke ? 'true' : 'false'}, ${p.isPriceOnRequest ? 'true' : 'false'}, ${p.inStock !== false ? 'true' : 'false'}, ${p.sequence || 999}) ON CONFLICT (id) DO UPDATE SET handle = EXCLUDED.handle, title = EXCLUDED.title, description = EXCLUDED.description, price = EXCLUDED.price, category = EXCLUDED.category, metal = EXCLUDED.metal, collection = EXCLUDED.collection, tags = EXCLUDED.tags, images = EXCLUDED.images, specs = EXCLUDED.specs, sequence = EXCLUDED.sequence;\n`;
    }
}

// 2. Catalogues
if (db.catalogues && db.catalogues.length > 0) {
    sql += "\n-- Migrate Catalogues\n";
    for (const c of db.catalogues) {
        sql += `INSERT INTO public.catalogues (id, title, description, image, link, year, featured, sequence) VALUES (${escapeSql(c.id)}, ${escapeSql(c.title)}, ${escapeSql(c.description)}, ${escapeSql(c.image)}, ${escapeSql(c.link)}, ${escapeSql(c.year)}, ${c.featured ? 'true' : 'false'}, ${c.sequence || 999}) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, image = EXCLUDED.image, link = EXCLUDED.link, sequence = EXCLUDED.sequence;\n`;
    }
}

// 3. Blogs
if (db.blogs && db.blogs.length > 0) {
    sql += "\n-- Migrate Blogs\n";
    for (const b of db.blogs) {
        sql += `INSERT INTO public.blogs (id, publication, date, title, excerpt, image, sequence) VALUES (${escapeSql(b.id)}, ${escapeSql(b.publication)}, ${escapeSql(b.date)}, ${escapeSql(b.title)}, ${escapeSql(b.excerpt)}, ${escapeSql(b.image)}, ${b.sequence || 999}) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, excerpt = EXCLUDED.excerpt, image = EXCLUDED.image, sequence = EXCLUDED.sequence;\n`;
    }
}

// 4. Testimonials
if (db.testimonials && db.testimonials.length > 0) {
    sql += "\n-- Migrate Testimonials\n";
    for (const t of db.testimonials) {
        sql += `INSERT INTO public.testimonials (id, quote, author, location, image, sequence) VALUES (${escapeSql(t.id)}, ${escapeSql(t.quote)}, ${escapeSql(t.author)}, ${escapeSql(t.location)}, ${escapeSql(t.image)}, ${t.sequence || 999}) ON CONFLICT (id) DO UPDATE SET quote = EXCLUDED.quote, author = EXCLUDED.author, location = EXCLUDED.location, sequence = EXCLUDED.sequence;\n`;
    }
}

// 5. Timeline Events
if (db.timelineEvents && db.timelineEvents.length > 0) {
    sql += "\n-- Migrate Timeline Events\n";
    for (const t of db.timelineEvents) {
        sql += `INSERT INTO public.timeline_events (id, date, title, description, images, link, sequence) VALUES (${escapeSql(t.id)}, ${escapeSql(t.date)}, ${escapeSql(t.title)}, ${escapeSql(t.description)}, ${arrayToSql(t.images)}, ${escapeSql(t.link)}, ${t.sequence || 999}) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, images = EXCLUDED.images, sequence = EXCLUDED.sequence;\n`;
    }
}

fs.writeFileSync('migrate_data.sql', sql);
console.log('Successfully generated migrate_data.sql');
