import { COURSES as CONTENT_COURSES } from '@/content/courses';
import { DESTINATIONS } from '@/content/destinations';
import { PLACES as CONTENT_PLACES } from '@/content/places';
import type { Region, RegionCourse, RegionPlace } from '@/types/region';

const LEGACY_COURSE_ID_MAP: Record<string, string> = {
  '2n3d-couple': 'seoul-2n3d-couple',
  '1day-city': 'seoul-1day-city',
  'seoul-palace-river-1day': 'seoul-palace-river-1day',
  'busan-east-west-1n2d': 'busan-east-west-1n2d',
  'busan-night-view-1day': 'busan-night-view-1day',
  'jeju-east-coast-1day': 'jeju-east-coast-1day',
  'jeju-west-drive-1day': 'jeju-west-drive-1day',
  'gangneung-coast-1day': 'gangneung-coast-1day',
  'gangneung-cafe-healing-1day': 'gangneung-cafe-healing-1day',
};

const LEGACY_HIGHLIGHT_COURSE_SLUGS: Record<string, string[]> = {
  seoul: ['2n3d-couple', '1day-city', 'seoul-palace-river-1day'],
  busan: ['busan-east-west-1n2d', 'busan-night-view-1day'],
  jeju: ['jeju-east-coast-1day', 'jeju-west-drive-1day'],
  gangneung: ['gangneung-coast-1day', 'gangneung-cafe-healing-1day'],
};

const LEGACY_REGION_SUBTITLE: Record<string, string> = {
  seoul: '서울 여행 가이드',
  busan: '부산 여행 가이드',
  jeju: '제주 여행 가이드',
  gangneung: '강릉 여행 가이드',
};

const LEGACY_REGION_BUDGET: Record<string, string> = {
  seoul: '1인 25~35만원',
  busan: '1인 20~30만원',
  jeju: '1인 35~55만원',
  gangneung: '1인 18~28만원',
};

const LEGACY_REGION_DURATION: Record<string, string> = {
  seoul: '2박3일',
  busan: '1박2일',
  jeju: '2박3일',
  gangneung: '1박2일',
};

const LEGACY_REGION_THEMES: Record<string, string[]> = {
  seoul: ['커플', '뚜벅이', '실내'],
  busan: ['바다', '맛집', '당일치기'],
  jeju: ['렌트카', '자연', '가족'],
  gangneung: ['카페', '바다', '드라이브'],
};

const LEGACY_REGION_WEATHER_TAGS: Record<string, string[]> = {
  seoul: ['비오는날 실내', '뚜벅이 여행', '아이랑 여행'],
  busan: ['실내 코스', '야경 코스', '뚜벅이'],
  jeju: ['우천 대체', '가성비 숙소', '아이 동반'],
  gangneung: ['비오는날', '당일치기', '맛집 중심'],
};

const LEGACY_COMPANION_LABEL: Record<string, string> = {
  solo: '혼자 여행',
  couple: '커플',
  friends: '친구 여행',
  parents: '부모님과',
  kids: '아이와',
  family: '가족 여행',
};

export const COURSES: Record<string, RegionCourse> = Object.fromEntries(
  Object.entries(LEGACY_COURSE_ID_MAP).map(([legacySlug, contentId]) => {
    const course = CONTENT_COURSES[contentId];

    return [
      legacySlug,
      {
        slug: legacySlug,
        title: course.title,
        summary: course.summary,
        budgetRange: course.budget.text ?? '',
        difficulty:
          course.difficulty === 1
            ? '쉬움'
            : course.difficulty === 2
              ? '보통'
              : '높음',
        target: course.companions
          .map((companion) => LEGACY_COMPANION_LABEL[companion])
          .join(' · '),
        days: course.days,
        tips: course.tips,
      },
    ];
  }),
);

export const PLACES: Record<string, RegionPlace> = Object.fromEntries(
  Object.values(CONTENT_PLACES).map((place) => [
    place.id,
    {
      slug: place.slug,
      name: place.name,
      address: place.address,
      hours: place.legacy?.hours ?? place.hoursText,
      fee: place.legacy?.fee ?? place.feeText,
      stayDuration: place.legacy?.stayDuration ?? `${place.stayMinutes.min}분`,
      bestVisitTime: place.legacy?.bestVisitTime ?? place.bestVisitText ?? '',
      tips: place.tips,
      nearbyPlaceSlugs: place.legacy?.nearbyPlaceSlugs ?? place.nearbyPlaceIds,
      includedCourseSlugs: place.legacy?.includedCourseSlugs ?? [],
    },
  ]),
);

export const REGIONS: Record<string, Region> = Object.fromEntries(
  Object.values(DESTINATIONS).map((destination) => [
    destination.slug,
    {
      id: destination.slug,
      name: destination.name,
      subtitle:
        LEGACY_REGION_SUBTITLE[destination.slug] ??
        `${destination.name} 여행 가이드`,
      updatedAt: destination.updatedAt,
      recommendedDuration:
        LEGACY_REGION_DURATION[destination.slug] ?? destination.tripLengths[0],
      averageBudget: LEGACY_REGION_BUDGET[destination.slug] ?? '',
      popularThemes:
        LEGACY_REGION_THEMES[destination.slug] ?? destination.themes,
      weatherTags: LEGACY_REGION_WEATHER_TAGS[destination.slug] ?? [],
      highlightCourseSlugs:
        LEGACY_HIGHLIGHT_COURSE_SLUGS[destination.slug] ?? [],
      placeSlugs: Object.values(CONTENT_PLACES)
        .filter((place) => place.regionId === destination.slug)
        .map((place) => place.id),
    },
  ]),
);

export const REGION_IDS = Object.keys(REGIONS);
export const regionList = REGION_IDS.map((id) => REGIONS[id]);
