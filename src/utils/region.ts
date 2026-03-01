import { COURSES, PLACES } from '@/constants/region';

export const findRegionCoursesBySlugs = (slugs: string[]) =>
  slugs.map((slug) => COURSES[slug]).filter(Boolean);

export const getRegionCourse = (courseSlug: string) =>
  COURSES[courseSlug] ?? null;

export const getRegionPlace = (placeSlug: string) => PLACES[placeSlug] ?? null;
