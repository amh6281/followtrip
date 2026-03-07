import type { Metadata } from 'next';
import BudgetTemplate from '@/components/tools/budget/templates/BudgetTemplate';
import { buildPageMetadata } from '@/lib/seo';

// 고정 페이지에 대한 metadata 생성
export const metadata: Metadata = {
  ...buildPageMetadata({
    title: '여행 경비 계산기',
    description:
      '인원, 숙박, 교통, 식비를 입력해 예상 비용을 빠르게 계산하세요.',
    path: '/tools/budget',
  }),
};

const BudgetPage = () => {
  return <BudgetTemplate />;
};

export default BudgetPage;
