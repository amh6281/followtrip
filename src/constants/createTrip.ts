import {
  ListChecksIcon,
  ImageIcon,
  NotePencilIcon,
  EyeIcon,
  MapPinIcon,
} from '@phosphor-icons/react/dist/ssr';

export const CREATE_TRIP_STEPS = [
  { id: 1, label: '기본 정보', icon: MapPinIcon },
  { id: 2, label: '일정', icon: ListChecksIcon },
  { id: 3, label: '대표 사진', icon: ImageIcon },
  { id: 4, label: '후기 (선택)', icon: NotePencilIcon },
  { id: 5, label: '미리보기', icon: EyeIcon },
] as const;
