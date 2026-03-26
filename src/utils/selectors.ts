import {
  COURSES as LEGACY_COURSES,
  PLACES as LEGACY_PLACES,
  REGIONS,
} from '@/constants/region';
import { COURSES, courseList } from '@/content/courses';
import { DESTINATIONS, destinationList } from '@/content/destinations';
import { LANDINGS, landingList } from '@/content/landings';
import { PLACES, placeList } from '@/content/places';
import type {
  RegionCourse as LegacyRegionCourse,
  RegionPlace as LegacyRegionPlace,
} from '@/types/region';
import type {
  CourseTemplate,
  Destination,
  LandingIntent,
  LandingPage,
  Region,
  RegionPlace,
} from '@/types/travel';

// 공통 배열 데이터를 특정 키 기준으로 묶어주는 내부 헬퍼 함수
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

// 목적지 원본 데이터를 그대로 꺼내 쓸 때 사용하는 셀렉터
export const destinations = DESTINATIONS;

// 장소 원본 데이터를 그대로 꺼내 쓸 때 사용하는 셀렉터
export const places = PLACES;

// 코스 원본 데이터를 그대로 꺼내 쓸 때 사용하는 셀렉터
export const courses = COURSES;

// 랜딩 원본 데이터를 그대로 꺼내 쓸 때 사용하는 셀렉터
export const landings = LANDINGS;

// 기존 지역 화면 호환용 레거시 지역 데이터
export const legacyRegions = REGIONS;
export const legacyRegionList = Object.values(REGIONS);

// 각 콘텐츠 컬렉션의 리스트 형태
export { destinationList, placeList, courseList, landingList };

// 지역별 장소 목록을 빠르게 조회하기 위한 파생 맵
export const placesByRegionId = groupBy(placeList, (place) => place.regionId);

// 지역별 코스 목록을 빠르게 조회하기 위한 파생 맵
export const coursesByRegionId = groupBy(
  courseList,
  (course) => course.regionId,
);

// 지역별 랜딩 목록을 빠르게 조회하기 위한 파생 맵
export const landingsByRegionId = groupBy(
  landingList,
  (landing) => landing.regionId,
);

// 특정 장소가 어떤 코스들에 포함되는지 역참조로 계산한 파생 맵
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

// place id로 단일 장소를 조회
export const placeById = (placeId: string): RegionPlace | null =>
  PLACES[placeId] ?? null;

// course id로 단일 코스를 조회
export const courseById = (courseId: string): CourseTemplate | null =>
  COURSES[courseId] ?? null;

// landing id로 단일 랜딩 페이지를 조회
export const landingById = (landingId: string): LandingPage | null =>
  LANDINGS[landingId] ?? null;

// region id로 목적지 데이터를 조회
export const destinationById = (regionId: string): Destination | null =>
  DESTINATIONS[regionId] ?? null;

// region id로 레거시 지역 데이터를 조회
export const regionById = (regionId: string): Region | null =>
  REGIONS[regionId] ?? null;

// 레거시 course slug로 단일 코스를 조회
export const legacyCourseBySlug = (
  courseSlug: string,
): LegacyRegionCourse | null => LEGACY_COURSES[courseSlug] ?? null;

// 레거시 place slug로 단일 장소를 조회
export const legacyPlaceBySlug = (
  placeSlug: string,
): LegacyRegionPlace | null => LEGACY_PLACES[placeSlug] ?? null;

// 레거시 course slug 배열을 실제 코스 배열로 변환
export const getLegacyCoursesBySlugs = (
  slugs: string[],
): LegacyRegionCourse[] =>
  slugs
    .map((slug) => legacyCourseBySlug(slug))
    .filter((course): course is LegacyRegionCourse => course !== null);

// 특정 지역에 속한 장소 목록을 반환
export const getPlacesByRegionId = (regionId: string): RegionPlace[] =>
  placesByRegionId[regionId] ?? [];

// 특정 지역에 속한 코스 목록을 반환
export const getCoursesByRegionId = (regionId: string): CourseTemplate[] =>
  coursesByRegionId[regionId] ?? [];

// 특정 지역에 속한 랜딩 목록을 반환
export const getLandingsByRegionId = (regionId: string): LandingPage[] =>
  landingsByRegionId[regionId] ?? [];

// 특정 장소를 포함하는 코스 목록을 실제 코스 객체 배열로 반환
export const getCoursesByPlaceId = (placeId: string): CourseTemplate[] =>
  (coursesByPlaceId[placeId] ?? [])
    .map((courseId) => courseById(courseId))
    .filter((course): course is CourseTemplate => course !== null);

// 지역과 장소 slug 조합으로 단일 장소
export const findPlaceByRegionAndSlug = (
  regionId: string,
  placeSlug: string,
): RegionPlace | null =>
  getPlacesByRegionId(regionId).find((place) => place.slug === placeSlug) ??
  null;

// 지역과 코스 slug 조합으로 단일 코스
export const findCourseByRegionAndSlug = (
  regionId: string,
  courseSlug: string,
): CourseTemplate | null =>
  getCoursesByRegionId(regionId).find((course) => course.slug === courseSlug) ??
  null;

// 지역과 랜딩 slug 조합으로 단일 랜딩
export const findLandingByRegionAndSlug = (
  regionId: string,
  landingSlug: string,
): LandingPage | null =>
  getLandingsByRegionId(regionId).find(
    (landing) => landing.slug === landingSlug,
  ) ?? null;

// 랜딩의 intent가 주어진 검색 조건과 맞는지 검사하는 내부 헬퍼 함수
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

// intent 조건과 지역 조건에 맞는 랜딩 목록을 필터링
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

// 현재 랜딩과 연결된 관련 랜딩 목록을 반환
export const getRelatedLandings = (landing: LandingPage): LandingPage[] =>
  (landing.relatedLandingIds ?? [])
    .map((landingId) => landingById(landingId))
    .filter((related): related is LandingPage => related !== null);
