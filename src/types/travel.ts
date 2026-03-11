// 여행 동반자 유형
export type Companion =
  | 'solo'
  | 'couple'
  | 'friends'
  | 'parents'
  | 'kids'
  | 'family';

// 이동 방식
export type Mobility = 'walk' | 'transit' | 'taxi' | 'car' | 'mixed';

// 여행지, 장소, 코스 공통 테마
export type Theme =
  | 'food'
  | 'cafe'
  | 'culture'
  | 'history'
  | 'nature'
  | 'ocean'
  | 'city'
  | 'shopping'
  | 'healing'
  | 'night-view'
  | 'drive'
  | 'family';

// 날씨나 실내외 적합도
export type WeatherFit =
  | 'sunny'
  | 'cloudy'
  | 'rainy'
  | 'snowy'
  | 'indoor'
  | 'outdoor'
  | 'all';

// 장소의 대표 카테고리
export type PlaceCategory =
  | 'market'
  | 'beach'
  | 'village'
  | 'museum'
  | 'park'
  | 'square'
  | 'street'
  | 'cafe-area'
  | 'observatory'
  | 'island'
  | 'landmark';

// 방문 추천 시간대
export type TimeSlot =
  | 'early-morning'
  | 'morning'
  | 'lunch'
  | 'afternoon'
  | 'evening'
  | 'night';

// 코스 난이도 숫자 레벨
export type Difficulty = 1 | 2 | 3;

// 여행 기간 라벨
export type TripLengthLabel = '당일' | '1박2일' | '2박3일';

// 예산 수준 구간 값
export type BudgetLevel = 'low' | 'mid' | 'high';

// 구조화된 예산 정보
export interface Budget {
  level: BudgetLevel;
  min?: number;
  max?: number;
  currency?: 'KRW';
  text?: string;
}

// 서울 출발 기준 이동 소요 시간
export interface TravelTimeFromSeoul {
  carHours?: number;
  ktxHours?: number;
  busHours?: number;
}

// 상위 여행지 정보
export interface Destination {
  slug: string;
  name: string;
  area: string;
  themes: Theme[];
  bestSeasons: string[];
  tripLengths: TripLengthLabel[];
  fromSeoul: TravelTimeFromSeoul;
  rainyOptions: string[];
  withWho: Companion[];
  budgetLevel: BudgetLevel;
  heroSummary: string;
  neighborhoods: string[];
  foodKeywords: string[];
  itinerarySeeds: string[];
  faqSeeds: string[];
  featuredPlaceIds?: string[];
  featuredCourseIds?: string[];
  updatedAt: string;
}

// 개별 장소 정보
export interface RegionPlace {
  slug: string;
  name: string;
  address: string;
  hours: string;
  fee: string;
  stayDuration: string;
  bestVisitTime: string;
  tips: string[];
  nearbyPlaceSlugs: string[];
  includedCourseSlugs: string[];
  regionId?: string;
  category?: PlaceCategory;
  themes?: Theme[];
  companions?: Companion[];
  weatherFit?: WeatherFit[];
  stayMinutes?: {
    min: number;
    max: number;
  };
  bestTimeSlots?: TimeSlot[];
  hoursText?: string;
  feeText?: string;
  nearbyPlaceIds?: string[];
}

// 코스 하루 일정
export interface CourseTemplateDay {
  title: string;
  schedule: Array<{ time: string; placeId: string }>;
}

// 여행 코스 템플릿 타입
export interface CourseTemplate {
  id: string;
  regionId: string;
  slug: string;
  title: string;
  summary: string;
  companions: Companion[];
  tripLength: {
    nights: number;
    days: number;
    label?: TripLengthLabel;
  };
  themes: Theme[];
  mobility: Mobility[];
  weatherFit: WeatherFit[];
  budget: Budget;
  difficulty: Difficulty;
  days: CourseTemplateDay[];
  tips: string[];
}

// 검색 의도형 랜딩 페이지 타입
export interface LandingPage {
  slug: string;
  destinationSlug: string;
  title: string;
  summary: string;
  intent:
    | 'trip-length'
    | 'weather'
    | 'companion'
    | 'theme'
    | 'mobility'
    | 'planner'
    | 'faq';
  tripLength?: TripLengthLabel;
  weatherFit?: WeatherFit[];
  companions?: Companion[];
  themes?: Theme[];
  mobility?: Mobility[];
  heroSummary?: string;
  intro?: string;
  highlights?: string[];
  faqSeeds?: string[];
  featuredPlaceIds?: string[];
  featuredCourseIds?: string[];
  seo: {
    title: string;
    description: string;
  };
  updatedAt: string;
}

// 레거시 코스의 하루 단위 구성
export interface RegionCourseDay {
  title: string;
  schedule: Array<{ time: string; placeId: string }>;
}

// 기존 화면이 사용하는 레거시 코스 타입
export interface RegionCourse {
  slug: string;
  title: string;
  summary: string;
  budgetRange: string;
  difficulty: string;
  target: string;
  days: RegionCourseDay[];
  tips: string[];
}

// 기존 화면이 사용하는 레거시 지역 타입
export interface Region {
  id: string;
  name: string;
  subtitle: string;
  updatedAt: string;
  recommendedDuration: string;
  averageBudget: string;
  popularThemes: string[];
  weatherTags: string[];
  highlightCourseSlugs: string[];
  placeSlugs: string[];
}

// 레거시 지역 타입
export type LegacyRegion = Region;

// 레거시 장소 타입
export type LegacyRegionPlace = RegionPlace;

// 레거시 코스 타입
export type LegacyRegionCourse = RegionCourse;
