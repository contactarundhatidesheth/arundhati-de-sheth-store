import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';

function escapeSql(str: any) {
    if (str === null || str === undefined) return 'NULL';
    if (typeof str === 'boolean') return str ? 'true' : 'false';
    if (typeof str === 'number') return str;
    return "'" + String(str).replace(/'/g, "''") + "'";
}

function arrayToSql(arr: any[]) {
    if (!arr || !Array.isArray(arr) || arr.length === 0) return "'{}'";
    return "ARRAY[" + arr.map(escapeSql).join(',') + "]::text[]";
}

function jsonbToSql(obj: any) {
    if (!obj) return "'{}'::jsonb";
    return escapeSql(JSON.stringify(obj)) + "::jsonb";
}

export async function GET(req: Request) {
  try {
    const db = readDB();
    let sql = '';

    if (db.products && db.products.length > 0) {
      sql += "-- Migrate Products\n";
      for (const p of db.products) {
          sql += `INSERT INTO public.products (id, handle, title, description, price, compare_at_price, category, metal, collection, tags, images, specs, is_new, is_bespoke, is_price_on_request, in_stock, sequence) VALUES (${escapeSql(p.id)}, ${escapeSql(p.handle)}, ${escapeSql(p.title)}, ${escapeSql(p.description)}, ${p.price || 0}, ${p.compareAtPrice || 'NULL'}, ${escapeSql(p.category)}, ${escapeSql(p.metal)}, ${escapeSql(p.collection)}, ${arrayToSql(p.tags)}, ${arrayToSql(p.images)}, ${jsonbToSql(p.specs)}, ${p.isNew ? 'true' : 'false'}, ${p.isBespoke ? 'true' : 'false'}, ${p.isPriceOnRequest ? 'true' : 'false'}, ${p.inStock !== false ? 'true' : 'false'}, ${p.sequence || 999}) ON CONFLICT (id) DO NOTHING;\n`;
      }
    }

    if (db.catalogues && db.catalogues.length > 0) {
      sql += "\n-- Migrate Catalogues\n";
      for (const c of db.catalogues) {
          sql += `INSERT INTO public.catalogues (id, title, description, image, link, year, featured, sequence) VALUES (${escapeSql(c.id)}, ${escapeSql(c.title)}, ${escapeSql(c.description)}, ${escapeSql(c.image)}, ${escapeSql(c.link)}, ${escapeSql(c.year)}, ${c.featured ? 'true' : 'false'}, ${c.sequence || 999}) ON CONFLICT (id) DO NOTHING;\n`;
      }
    }

    if (db.blogs && db.blogs.length > 0) {
      sql += "\n-- Migrate Blogs\n";
      for (const b of db.blogs) {
          sql += `INSERT INTO public.blogs (id, publication, date, title, excerpt, image, sequence) VALUES (${escapeSql(b.id)}, ${escapeSql(b.publication)}, ${escapeSql(b.date)}, ${escapeSql(b.title)}, ${escapeSql(b.excerpt)}, ${escapeSql(b.image)}, ${b.sequence || 999}) ON CONFLICT (id) DO NOTHING;\n`;
      }
    }

    if (db.testimonials && db.testimonials.length > 0) {
      sql += "\n-- Migrate Testimonials\n";
      for (const t of db.testimonials) {
          sql += `INSERT INTO public.testimonials (id, quote, author, location, image, sequence) VALUES (${escapeSql(t.id)}, ${escapeSql(t.quote)}, ${escapeSql(t.author)}, ${escapeSql(t.location)}, ${escapeSql(t.image)}, ${t.sequence || 999}) ON CONFLICT (id) DO NOTHING;\n`;
      }
    }

    if (db.timelineEvents && db.timelineEvents.length > 0) {
      sql += "\n-- Migrate Timeline Events\n";
      for (const t of db.timelineEvents) {
          sql += `INSERT INTO public.timeline_events (id, date, title, description, images, link, sequence) VALUES (${escapeSql(t.id)}, ${escapeSql(t.date)}, ${escapeSql(t.title)}, ${escapeSql(t.description)}, ${arrayToSql(t.images)}, ${escapeSql(t.link)}, ${t.sequence || 999}) ON CONFLICT (id) DO NOTHING;\n`;
      }
    }

    return new NextResponse(sql, { headers: { 'Content-Type': 'text/plain' } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
