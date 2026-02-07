import type { TripDetail, TripReview, TripStep } from '@/types/trip';
import { dummyTrips } from './dummy-trips';

const details: Record<string, { steps: TripStep[]; review: TripReview }> = {
  '1': {
    steps: [
      {
        id: 's1-1',
        order: 1,
        time: '08:00',
        placeName: 'KTX 부산역 도착',
        transport: '대중교통',
        cost: 59800,
        durationMinutes: 0,
        memo: '서울 출발 기준',
      },
      {
        id: 's1-2',
        order: 2,
        time: '08:30',
        placeName: '해운대 해수욕장',
        transport: '대중교통',
        cost: 1500,
        durationMinutes: 30,
        image:
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop',
        memo: '아침 바다 산책',
      },
      {
        id: 's1-3',
        order: 3,
        time: '10:00',
        placeName: '동백섬',
        transport: '도보',
        cost: 0,
        durationMinutes: 90,
        memo: '산책로 따라 걸어서',
      },
      {
        id: 's1-4',
        order: 4,
        time: '12:00',
        placeName: '해운대 맛집 (회)',
        transport: '도보',
        cost: 18000,
        durationMinutes: 60,
        memo: '점심',
      },
      {
        id: 's1-5',
        order: 5,
        time: '14:00',
        placeName: '광안리 해수욕장',
        transport: '택시',
        cost: 8000,
        durationMinutes: 20,
        image:
          'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&h=400&fit=crop',
        memo: '해운대에서 택시',
      },
      {
        id: 's1-6',
        order: 6,
        time: '16:00',
        placeName: 'KTX 부산역 출발',
        transport: '대중교통',
        cost: 1700,
        durationMinutes: 30,
        memo: '귀경',
      },
    ],
    review: {
      fullText:
        '당일치기로 충분히 즐길 수 있는 코스예요. 아침 일찍 출발해서 해운대와 광안리 둘 다 가봤습니다. 동백섬 산책이 제일 좋았어요.',
      recommendPoints: [
        '동백섬 산책로가 아침에 한적하고 좋음',
        '해운대 회 맛집 많아서 점심 추천',
        'KTX 타고 당일치기 부담 없음',
      ],
      notRecommendPoints: [
        '주말이면 해운대 인파 많음',
        '점심 시간대 웨이팅 있을 수 있음',
      ],
      nextTimeChanges: [
        '저녁 노을 보려면 1박 추가할 것',
        '광안대교 야경 코스 넣고 싶음',
      ],
    },
  },
  '2': {
    steps: [
      {
        id: 's2-1',
        order: 1,
        time: '09:00',
        placeName: '제주 공항 렌터카 픽업',
        transport: '렌터카',
        cost: 85000,
        durationMinutes: 60,
        memo: '1박2일 기준 렌터카',
      },
      {
        id: 's2-2',
        order: 2,
        time: '11:00',
        placeName: '성산일출봉',
        transport: '렌터카',
        cost: 5000,
        durationMinutes: 120,
        image:
          'https://images.unsplash.com/photo-1602211878317-54e822d0a710?w=600&h=400&fit=crop',
        memo: '입장료 포함',
      },
      {
        id: 's2-3',
        order: 3,
        time: '14:00',
        placeName: '섭지코지',
        transport: '렌터카',
        cost: 2000,
        durationMinutes: 90,
        memo: '성산에서 가까움',
      },
      {
        id: 's2-4',
        order: 4,
        time: '17:00',
        placeName: '제주 시청 근처 숙소 체크인',
        transport: '렌터카',
        cost: 0,
        durationMinutes: 60,
        memo: '1박',
      },
    ],
    review: {
      fullText:
        '2박3일이면 동선 여유 있게 다닐 수 있어요. 렌터카 필수이고, 성산일출봉과 섭지코지는 꼭 가보세요.',
      recommendPoints: [
        '성산일출봉 일출 보려면 새벽 출발',
        '섭지코지 풍경이 좋음',
        '렌터카로 이동이 편함',
      ],
      notRecommendPoints: ['날씨에 따라 성산일출봉 입장 제한 있을 수 있음'],
      nextTimeChanges: ['한라산 등반 추가', '서귀포 쪽 코스 더 넣기'],
    },
  },
};

export function getTripDetail(id: string): TripDetail | null {
  const trip = dummyTrips.find((t) => t.id === id);
  if (!trip) return null;

  const d = details[id];
  const steps = d?.steps ?? [];
  const review = d?.review ?? undefined;

  return {
    ...trip,
    steps: steps.toSorted((a, b) => a.order - b.order),
    ...(review != null && { review }),
  };
}
