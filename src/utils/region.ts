import { COURSES, PLACES, REGION_HUBS } from '@/constants/region';

export const REGION_IDS = Object.keys(REGION_HUBS);

export const getRegionHub = (regionId: string) => REGION_HUBS[regionId] ?? null;

export const getRegionCourse = (courseSlug: string) =>
  COURSES[courseSlug] ?? null;

export const getRegionPlace = (placeSlug: string) => PLACES[placeSlug] ?? null;

export const getRegionCourses = (slugs: string[]) =>
  slugs.map((slug) => COURSES[slug]).filter(Boolean);

export const getRegionPlaces = (slugs: string[]) =>
  slugs.map((slug) => PLACES[slug]).filter(Boolean);

export const regionHubList = REGION_IDS.map((id) => REGION_HUBS[id]);
