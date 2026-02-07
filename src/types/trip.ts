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
