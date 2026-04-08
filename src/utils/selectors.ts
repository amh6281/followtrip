import { COURSES, courseList } from '@/content/courses';
import { DESTINATIONS, destinationList } from '@/content/destinations';
import { LANDINGS, landingList } from '@/content/landings';
import { PLACES, placeList } from '@/content/places';
import type {
  Companion,
  CourseTemplate,
  Destination,
  LandingIntent,
  LandingPage,
  RegionPlace,
} from '@/types/travel';

const groupBy = <T>(
  items: T[],
  getKey: (item: T) => string,
): Record<string, T[]> =>
  items.reduce<Record<string, T[]>>((acc, item) => {
    const key = getKey(item);
    acc[key] ??= [];
    acc[key].push(item);
    return acc;
  }, {});

export { destinationList, placeList, courseList, landingList };

export const placesByRegionId = groupBy(placeList, (place) => place.regionId);

export const coursesByRegionId = groupBy(
  courseList,
  (course) => course.regionId,
);

export const landingsByRegionId = groupBy(
  landingList,
  (landing) => landing.regionId,
);

export const coursesByPlaceId = courseList.reduce<Record<string, string[]>>(
  (acc, course) => {
    for (const day of course.days) {
      for (const item of day.schedule) {
        acc[item.placeId] ??= [];
        if (!acc[item.placeId].includes(course.id)) {
          acc[item.placeId].push(course.id);
        }
      }
    }

    return acc;
  },
  {},
);

export const placeById = (placeId: string): RegionPlace | null =>
  PLACES[placeId] ?? null;

export const courseById = (courseId: string): CourseTemplate | null =>
  COURSES[courseId] ?? null;

export const landingById = (landingId: string): LandingPage | null =>
  LANDINGS[landingId] ?? null;

export const destinationById = (regionId: string): Destination | null =>
  DESTINATIONS[regionId] ?? null;

export const getPlacesByRegionId = (regionId: string): RegionPlace[] =>
  placesByRegionId[regionId] ?? [];

export const getCoursesByRegionId = (regionId: string): CourseTemplate[] =>
  coursesByRegionId[regionId] ?? [];

export const getLandingsByRegionId = (regionId: string): LandingPage[] =>
  landingsByRegionId[regionId] ?? [];

export const getCoursesByPlaceId = (placeId: string): CourseTemplate[] =>
  (coursesByPlaceId[placeId] ?? [])
    .map((courseId) => courseById(courseId))
    .filter((course): course is CourseTemplate => course !== null);

export const getFeaturedCoursesByRegionId = (
  regionId: string,
): CourseTemplate[] => {
  const destination = destinationById(regionId);

  if (!destination) {
    return [];
  }

  return destination.featuredCourseIds
    .map((courseId) => courseById(courseId))
    .filter((course): course is CourseTemplate => course !== null);
};

export const findCourseByRegionAndSlug = (
  regionId: string,
  courseSlug: string,
): CourseTemplate | null =>
  getCoursesByRegionId(regionId).find((course) => course.slug === courseSlug) ??
  null;

export const findLandingByRegionAndSlug = (
  regionId: string,
  landingSlug: string,
): LandingPage | null =>
  getLandingsByRegionId(regionId).find(
    (landing) => landing.slug === landingSlug,
  ) ?? null;

const matchesIntent = (
  landing: LandingPage,
  intent: Partial<LandingIntent>,
): boolean => {
  if (intent.days !== undefined && landing.intent.days !== intent.days) {
    return false;
  }

  if (intent.nights !== undefined && landing.intent.nights !== intent.nights) {
    return false;
  }

  if (
    intent.companions?.length &&
    !intent.companions.every((companion) =>
      landing.intent.companions?.includes(companion),
    )
  ) {
    return false;
  }

  if (
    intent.themes?.length &&
    !intent.themes.every((theme) => landing.intent.themes?.includes(theme))
  ) {
    return false;
  }

  if (
    intent.mobility?.length &&
    !intent.mobility.every((mobility) =>
      landing.intent.mobility?.includes(mobility),
    )
  ) {
    return false;
  }

  if (
    intent.weatherFit?.length &&
    !intent.weatherFit.every((weather) =>
      landing.intent.weatherFit?.includes(weather),
    )
  ) {
    return false;
  }

  return true;
};

export const findLandings = (
  intent: Partial<LandingIntent> = {},
  regionId?: string,
): LandingPage[] =>
  landingList.filter((landing) => {
    if (regionId && landing.regionId !== regionId) {
      return false;
    }

    return matchesIntent(landing, intent);
  });

export const getRelatedLandings = (landing: LandingPage): LandingPage[] =>
  (landing.relatedLandingIds ?? [])
    .map((landingId) => landingById(landingId))
    .filter((related): related is LandingPage => related !== null);

const companionLabels: Record<Companion, string> = {
  solo: '혼자 여행',
  couple: '커플',
  friends: '친구 여행',
  parents: '부모님과',
  kids: '아이와',
  family: '가족 여행',
};

export const formatCourseBudget = (course: CourseTemplate): string =>
  course.budget.text ?? '예산 정보 준비 중';

export const formatCourseDifficulty = (course: CourseTemplate): string =>
  course.difficulty === 1 ? '쉬움' : course.difficulty === 2 ? '보통' : '높음';

export const formatCourseAudience = (course: CourseTemplate): string =>
  course.companions
    .map((companion) => companionLabels[companion] ?? companion)
    .join(' · ');

export const formatPlaceStayDuration = (place: RegionPlace): string =>
  place.stayMinutes.min === place.stayMinutes.max
    ? `${place.stayMinutes.min}분`
    : `${place.stayMinutes.min}~${place.stayMinutes.max}분`;

export const formatPlaceBestVisitTime = (place: RegionPlace): string =>
  place.bestVisitText ?? '방문 시간 정보 준비 중';
