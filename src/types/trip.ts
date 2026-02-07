export interface Trip {
  id: string;
  title: string;
  location: string;
  duration: string; // "당일" | "1박2일" | "2박3일" 등
  travelType: string; // "혼자" | "커플" | "가족" | "친구"
  totalCost: number; // 총 경비 (원)
  likes: number;
  thumbnail: string; // 대표 사진 URL
  createdAt: string; // 작성일
}

// 타임라인 스텝
export interface TripStep {
  id: string;
  order: number; // 정렬 순서 (1, 2, 3 …)
  time: string; // 해당 장소 도착 시각, 예: "09:00"
  placeName: string; // 장소명
  transport: '도보' | '대중교통' | '택시' | '렌터카'; // 이동 수단
  cost: number; // 장소에서 쓴 비용 (원)
  durationMinutes: number; // 장소에서 머문 시간 (분)
  image?: string; // 장소 대표 사진 URL (선택)
  memo?: string; // 한 줄 메모 (선택)
}

// 후기
export interface TripReview {
  fullText: string; // 전체 후기 본문
  recommendPoints: string[]; // 추천 포인트 목록
  notRecommendPoints: string[]; // 비추천 포인트 목록
  nextTimeChanges: string[]; // 다음에 바꿀 점 목록
}

// 상세 여행 정보
export interface TripDetail extends Trip {
  steps: TripStep[];
  review?: TripReview;
}
