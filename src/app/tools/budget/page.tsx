import type { Metadata } from 'next';
import BudgetTemplate from '@/components/tools/budget/templates/BudgetTemplate';

export const metadata: Metadata = {
  title: '여행 경비 계산기 | followtrip',
  description: '인원·숙박·교통·식비를 입력해 예상 비용을 빠르게 계산하세요',
};

const BudgetPage = () => {
  return <BudgetTemplate />;
};

export default BudgetPage;
