import { BackLink } from '@/components/common';
import { BudgetBadge } from '../atoms';

const BudgetHeaderSection = () => {
  return (
    <section className='space-y-4'>
      <BackLink href='/'>홈으로 돌아가기</BackLink>

      <div className='space-y-3'>
        <BudgetBadge text='Budget Planner' />
        <h1 className='text-foreground text-3xl font-semibold tracking-tight md:text-4xl'>
          여행 경비 계산기
        </h1>
        <p className='text-muted-foreground max-w-2xl text-sm md:text-base'>
          여행 인원과 항목별 예산을 입력해 총 예상 비용과 1인당 비용을 빠르게
          확인하세요.
        </p>
      </div>
    </section>
  );
};

export default BudgetHeaderSection;
