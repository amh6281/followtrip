import type { MetadataRoute } from 'next';
import { REGIONS } from '@/constants/region';
import { absoluteUrl } from '@/lib/seo';

// 검색엔진이 색인할 공개 페이지를 정의한 sitemap
const sitemap = (): MetadataRoute.Sitemap => {
  const routes = [
    '/',
    '/tools/budget',
    ...Object.values(REGIONS).flatMap((region) => [
      `/${region.id}`,
      ...region.highlightCourseSlugs.map(
        (courseId) => `/${region.id}/${courseId}`,
      ),
      ...region.placeSlugs.map((placeId) => `/${region.id}/place/${placeId}`),
    ]),
  ];

  return routes
    .map((path) => absoluteUrl(path))
    .filter((url): url is string => Boolean(url))
    .map((url) => ({
      url,
      changeFrequency: 'weekly' as const,
      priority: url === absoluteUrl('/') ? 1 : 0.7,
    }));
};

export default sitemap;
