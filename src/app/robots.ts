import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

// // 검색엔진이 사이트를 크롤링할 수 있도록 허용하고 sitemap 위치를 제공하는 robots
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
  },
  sitemap: absoluteUrl('/sitemap.xml') ?? undefined,
  host: absoluteUrl('/') ?? undefined,
});

export default robots;
