import { courseById, placeById, regionById } from '@/utils/selectors';
import { COURSES, PLACES } from '@/constants/region';

export const findRegionCoursesBySlugs = (slugs: string[]) =>
  slugs.map((slug) => COURSES[slug]).filter(Boolean);

export const getRegionCourse = (courseSlug: string) =>
  COURSES[courseSlug] ?? courseById(courseSlug);

export const getRegionPlace = (placeSlug: string) =>
  PLACES[placeSlug] ?? placeById(placeSlug);

export const getRegion = (regionId: string) => regionById(regionId);
