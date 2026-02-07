/** 경비 표시 (만원 단위, 0원은 '무료') */
export function formatCost(cost: number): string {
  if (cost === 0) return '무료';
  if (cost >= 10000) return `${(cost / 10000).toFixed(1)}만원`;
  return `${cost.toLocaleString()}원`;
}

/** 스텝용 소요 시간 (0이면 빈 문자열, 일 단위 없음) */
export function formatDuration(minutes: number): string {
  if (minutes === 0) return '';
  if (minutes < 60) return `${minutes}분`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}시간` : `${h}시간 ${m}분`;
}
