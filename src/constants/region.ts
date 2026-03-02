import type { RegionCourse, RegionPlace, RegionHub } from '@/types/region';

export const COURSES: Record<string, RegionCourse> = {
  '2n3d-couple': {
    slug: '2n3d-couple',
    title: '서울 2박3일 커플 여행 코스',
    summary: '도보와 지하철 위주로 이동 가능한 감성 코스',
    budgetRange: '40~60만원',
    difficulty: '쉬움',
    target: '20~30대 커플',
    days: [
      {
        title: 'Day 1',
        schedule: [
          { time: '10:00', placeId: 'ikseondong' },
          { time: '12:00', placeId: 'gwangjang-market' },
          { time: '15:00', placeId: 'seongsu' },
        ],
      },
      {
        title: 'Day 2',
        schedule: [
          { time: '10:30', placeId: 'bukchon' },
          { time: '13:00', placeId: 'ikseondong' },
          { time: '18:00', placeId: 'seongsu' },
        ],
      },
      {
        title: 'Day 3',
        schedule: [
          { time: '09:30', placeId: 'gwangjang-market' },
          { time: '12:30', placeId: 'bukchon' },
        ],
      },
    ],
    tips: [
      '주말은 익선동 웨이팅이 길어 오전 방문이 유리합니다.',
      '대중교통 이동 기준 하루 15,000원 교통비를 잡으면 안정적입니다.',
    ],
  },
  '1day-city': {
    slug: '1day-city',
    title: '서울 당일치기 코스',
    summary: '아침부터 저녁까지 압축한 도심 코스',
    budgetRange: '12~20만원',
    difficulty: '보통',
    target: '친구/가족 소규모',
    days: [
      {
        title: 'Day 1',
        schedule: [
          { time: '09:00', placeId: 'gwangjang-market' },
          { time: '11:30', placeId: 'bukchon' },
          { time: '15:00', placeId: 'ikseondong' },
        ],
      },
    ],
    tips: ['도보 이동량이 많아 편한 신발을 권장합니다.'],
  },
};

export const PLACES: Record<string, RegionPlace> = {
  ikseondong: {
    slug: 'ikseondong',
    name: '익선동 한옥거리',
    address: '서울 종로구 익선동 일대',
    hours: '상점별 상이 (대부분 11:00~22:00)',
    fee: '무료',
    stayDuration: '1~2시간',
    bestVisitTime: '평일 오전 11시 이전',
    tips: [
      '골목 안쪽 카페는 오픈 직후가 가장 한산합니다.',
      '야간 조명 스팟은 해질 무렵 촬영이 좋습니다.',
    ],
    nearbyPlaceSlugs: ['gwangjang-market', 'bukchon'],
    includedCourseSlugs: ['2n3d-couple', '1day-city'],
  },
  'gwangjang-market': {
    slug: 'gwangjang-market',
    name: '광장시장',
    address: '서울 종로구 창경궁로 88',
    hours: '09:00~23:00',
    fee: '무료',
    stayDuration: '1~1.5시간',
    bestVisitTime: '오전 9시~11시',
    tips: [
      '점심 피크타임 전 방문 시 대기 시간이 짧습니다.',
      '현금 결제가 편한 가게가 일부 있습니다.',
    ],
    nearbyPlaceSlugs: ['ikseondong', 'seongsu'],
    includedCourseSlugs: ['2n3d-couple', '1day-city'],
  },
  seongsu: {
    slug: 'seongsu',
    name: '성수 카페거리',
    address: '서울 성동구 성수동 일대',
    hours: '상점별 상이 (대부분 10:00~21:00)',
    fee: '무료',
    stayDuration: '2시간',
    bestVisitTime: '평일 오후 2시 전',
    tips: [
      '브런치 매장은 사전 예약 가능 여부를 확인하세요.',
      '주말은 주차보다 지하철 접근이 빠릅니다.',
    ],
    nearbyPlaceSlugs: ['ikseondong', 'gwangjang-market'],
    includedCourseSlugs: ['2n3d-couple'],
  },
  bukchon: {
    slug: 'bukchon',
    name: '북촌 한옥마을',
    address: '서울 종로구 계동길 일대',
    hours: '상시 개방',
    fee: '무료',
    stayDuration: '1.5시간',
    bestVisitTime: '오전 9시~10시 30분',
    tips: [
      '주거 지역이 있어 정숙 관람이 필요합니다.',
      '오르막 구간이 있어 편한 신발이 좋습니다.',
    ],
    nearbyPlaceSlugs: ['ikseondong', 'gwangjang-market'],
    includedCourseSlugs: ['2n3d-couple', '1day-city'],
  },
};

export const REGION_HUBS: Record<string, RegionHub> = {
  seoul: {
    id: 'seoul',
    name: '서울',
    subtitle: '서울 여행 가이드',
    updatedAt: '2026-02-19',
    recommendedDuration: '2박3일',
    averageBudget: '1인 25~35만원',
    popularThemes: ['커플', '뚜벅이', '실내'],
    weatherTags: ['비오는날 실내', '뚜벅이 여행', '아이랑 여행'],
    highlightCourseSlugs: ['2n3d-couple', '1day-city'],
    placeSlugs: ['ikseondong', 'seongsu', 'bukchon'],
  },
  busan: {
    id: 'busan',
    name: '부산',
    subtitle: '부산 여행 가이드',
    updatedAt: '2026-02-19',
    recommendedDuration: '1박2일',
    averageBudget: '1인 20~30만원',
    popularThemes: ['바다', '맛집', '당일치기'],
    weatherTags: ['실내 코스', '야경 코스', '뚜벅이'],
    highlightCourseSlugs: ['1day-city'],
    placeSlugs: ['ikseondong'],
  },
  jeju: {
    id: 'jeju',
    name: '제주',
    subtitle: '제주 여행 가이드',
    updatedAt: '2026-02-19',
    recommendedDuration: '2박3일',
    averageBudget: '1인 35~55만원',
    popularThemes: ['렌트카', '자연', '가족'],
    weatherTags: ['우천 대체', '가성비 숙소', '아이 동반'],
    highlightCourseSlugs: ['2n3d-couple'],
    placeSlugs: ['seongsu'],
  },
  gangneung: {
    id: 'gangneung',
    name: '강릉',
    subtitle: '강릉 여행 가이드',
    updatedAt: '2026-02-19',
    recommendedDuration: '1박2일',
    averageBudget: '1인 18~28만원',
    popularThemes: ['카페', '바다', '드라이브'],
    weatherTags: ['비오는날', '당일치기', '맛집 중심'],
    highlightCourseSlugs: ['1day-city'],
    placeSlugs: ['gwangjang-market'],
  },
};

export const REGION_IDS = Object.keys(REGION_HUBS);

export const regionHubList = REGION_IDS.map((id) => REGION_HUBS[id]);
