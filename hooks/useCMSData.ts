import { useState, useEffect } from 'react';
import { Database, Product, Catalogue, Blog, Testimonial } from '@/lib/db';

// Fallback data is empty initially
const defaultData: Database = {
  products: [],
  catalogues: [],
  blogs: [],
  testimonials: [],
  timelineEvents: [],
  analytics: {
    visitors: 0,
    whatsappClicks: 0,
    productViews: {},
    dailyVisitors: {},
    referrers: {}
  }
};

export function useCMSData() {
  const [data, setData] = useState<Database>(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/db?t=${Date.now()}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load CMS data', err);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}
