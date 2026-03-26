import type { MetadataRoute } from 'next';
import {
  courseList,
  destinationList,
  landingList,
  placeList,
} from '@/utils/selectors';
import { absoluteUrl } from '@/utils/seo';

// 검색엔진이 색인할 공개 페이지를 정의한 sitemap
const sitemap = (): MetadataRoute.Sitemap => {
  const routes = [
    '/',
    ...destinationList.map(
      (destination) => `/destinations/${destination.slug}`,
    ),
    ...placeList.map(
      (place) => `/destinations/${place.regionId}/places/${place.slug}`,
    ),
    ...courseList.map(
      (course) => `/destinations/${course.regionId}/courses/${course.slug}`,
    ),
    ...landingList
      .filter((landing) => landing.indexable)
      .map((landing) => `/trips/${landing.regionId}/${landing.slug}`),
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
