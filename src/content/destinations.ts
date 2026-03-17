import type { Destination } from '@/types/travel';

export const DESTINATIONS: Record<string, Destination> = {
  seoul: {
    slug: 'seoul',
    name: '서울',
    area: '서울특별시',
    themes: ['city', 'culture', 'food', 'cafe', 'shopping'],
    bestSeasons: ['봄', '가을', '겨울 실내 여행'],
    tripLengths: ['당일', '1박2일', '2박3일'],
    fromSeoul: { carHours: 0, ktxHours: 0, busHours: 0 },
    rainyOptions: [
      '익선동과 성수 카페 투어',
      '광화문 일대 실내 전시',
      '시장 먹거리 중심 실내 동선',
    ],
    withWho: ['solo', 'couple', 'friends', 'parents', 'family'],
    budgetLevel: 'mid',
    heroSummary:
      '도심 산책, 카페, 미식, 전시를 한 번에 엮기 좋은 대한민국 대표 도시 여행지입니다.',
    neighborhoods: ['익선동', '북촌', '성수', '광화문', '반포'],
    foodKeywords: ['시장 먹거리', '브런치', '카페', '한식'],
    itinerarySeeds: [
      '익선동-광장시장 반나절 코스',
      '북촌-광화문-한강 야경 코스',
      '성수 카페와 쇼핑 중심 하루 일정',
    ],
    faqSeeds: [
      '서울 여행은 며칠이 적당한가요?',
      '비 오는 날 서울에서 갈 만한 곳은?',
      '서울 뚜벅이 여행 동선은 어떻게 짜나요?',
    ],
    featuredPlaceIds: [
      'ikseondong',
      'gwangjang-market',
      'bukchon',
      'banpo-hangang-park',
    ],
    featuredCourseIds: [
      'seoul-2n3d-couple',
      'seoul-1day-city',
      'seoul-palace-river-1day',
    ],
    updatedAt: '2026-02-19',
  },
  busan: {
    slug: 'busan',
    name: '부산',
    area: '부산광역시',
    themes: ['ocean', 'food', 'night-view', 'city', 'cafe'],
    bestSeasons: ['봄', '초여름', '가을'],
    tripLengths: ['당일', '1박2일', '2박3일'],
    fromSeoul: { carHours: 5.5, ktxHours: 2.5, busHours: 4.5 },
    rainyOptions: [
      '영도 카페와 실내 전망 스팟',
      '시장 먹거리 중심 동선',
      '해변 대신 실내 전시와 카페 위주 일정',
    ],
    withWho: ['solo', 'couple', 'friends', 'parents', 'family'],
    budgetLevel: 'mid',
    heroSummary:
      '바다 풍경과 도시 야경, 먹거리 밀집도가 높아 짧은 일정으로도 만족도가 큰 해안 도시입니다.',
    neighborhoods: ['감천', '영도', '해운대', '광안리'],
    foodKeywords: ['회', '돼지국밥', '씨앗호떡', '오션뷰 카페'],
    itinerarySeeds: [
      '감천-영도-해운대 1박2일',
      '광안리 야경 중심 하루 코스',
      'KTX 도착 후 해변과 카페 압축 동선',
    ],
    faqSeeds: [
      '부산은 1박2일로 충분한가요?',
      '서울에서 부산 당일치기가 가능한가요?',
      '비 오는 날 부산 코스는 어떻게 짜나요?',
    ],
    featuredPlaceIds: [
      'gamcheon-village',
      'huinnyeoul-tunnel',
      'haeundae-beach',
      'gwangalli-beach',
    ],
    featuredCourseIds: ['busan-east-west-1n2d', 'busan-night-view-1day'],
    updatedAt: '2026-02-19',
  },
  jeju: {
    slug: 'jeju',
    name: '제주',
    area: '제주특별자치도',
    themes: ['nature', 'drive', 'ocean', 'healing', 'family'],
    bestSeasons: ['봄', '초여름', '가을'],
    tripLengths: ['1박2일', '2박3일'],
    fromSeoul: { carHours: 0, ktxHours: 0, busHours: 0 },
    rainyOptions: [
      '티뮤지엄과 실내 카페 코스',
      '박물관과 정원 중심 일정',
      '해변 대신 실내 체험 위주 일정',
    ],
    withWho: ['couple', 'friends', 'parents', 'kids', 'family'],
    budgetLevel: 'high',
    heroSummary:
      '드라이브와 자연 풍경, 해안 산책, 가족 여행 수요가 고르게 강한 국내 대표 섬 여행지입니다.',
    neighborhoods: ['성산', '섭지코지', '우도', '협재', '한림'],
    foodKeywords: ['흑돼지', '갈치', '해산물', '오션뷰 카페'],
    itinerarySeeds: [
      '동부 성산-섭지-우도 하루 코스',
      '서부 오설록-협재 드라이브',
      '가족 여행용 자연 체험 일정',
    ],
    faqSeeds: [
      '제주 여행은 렌터카가 꼭 필요한가요?',
      '제주 비 오는 날 갈 만한 곳은?',
      '제주 동부와 서부 중 어디가 더 좋나요?',
    ],
    featuredPlaceIds: [
      'seongsan-ilchulbong',
      'udo-island',
      'osulloc',
      'hyeopjae-beach',
    ],
    featuredCourseIds: ['jeju-east-coast-1day', 'jeju-west-drive-1day'],
    updatedAt: '2026-02-19',
  },
  gangneung: {
    slug: 'gangneung',
    name: '강릉',
    area: '강원특별자치도 강릉시',
    themes: ['ocean', 'cafe', 'healing', 'food', 'drive'],
    bestSeasons: ['봄', '여름', '가을'],
    tripLengths: ['당일', '1박2일'],
    fromSeoul: { carHours: 3, ktxHours: 2, busHours: 2.7 },
    rainyOptions: [
      '초당 카페와 순두부 마을 중심 코스',
      '오죽헌 실내 전시 관람',
      '해변 대신 카페거리와 먹거리 위주 일정',
    ],
    withWho: ['solo', 'couple', 'friends', 'parents', 'family'],
    budgetLevel: 'mid',
    heroSummary:
      '바다와 카페, 로컬 먹거리를 짧은 일정 안에 자연스럽게 엮기 좋은 동해안 대표 여행지입니다.',
    neighborhoods: ['초당', '경포', '안목', '오죽헌 일대'],
    foodKeywords: ['초당순두부', '커피', '해산물', '장칼국수'],
    itinerarySeeds: [
      '오죽헌-경포-안목 하루 코스',
      '초당 순두부와 카페 힐링 일정',
      'KTX 강릉역 기준 1박2일 동선',
    ],
    faqSeeds: [
      '강릉은 당일치기와 1박2일 중 어떤 일정이 좋나요?',
      '강릉 비 오는 날 어디를 가면 좋나요?',
      '안목해변 카페거리는 언제 가야 하나요?',
    ],
    featuredPlaceIds: [
      'ojukheon',
      'gyeongpo-beach',
      'anmok-beach',
      'chodang-sundubu-village',
    ],
    featuredCourseIds: ['gangneung-coast-1day', 'gangneung-cafe-healing-1day'],
    updatedAt: '2026-02-19',
  },
};

export const DESTINATION_IDS = Object.keys(DESTINATIONS);
export const destinationList = DESTINATION_IDS.map((id) => DESTINATIONS[id]);
