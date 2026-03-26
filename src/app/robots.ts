import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/utils/seo';

// 검색엔진이 공개 페이지를 크롤링할 수 있도록 허용하고 sitemap 위치를 제공합니다.
// planner 경로는 robots.txt에서 막지 않고, 페이지 메타의 noindex로 제어합니다.
const robots = (): MetadataRoute.Robots => ({
  rules: [{ userAgent: '*', allow: '/' }],
  sitemap: absoluteUrl('/sitemap.xml') ?? undefined,
  host: absoluteUrl('/') ?? undefined,
});

export default robots;
