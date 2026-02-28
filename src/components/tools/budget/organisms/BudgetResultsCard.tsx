import { BudgetResultItem } from '../molecules';

const BudgetResultsCard = () => {
  return (
    <section className='border-border bg-background space-y-4 rounded-2xl border p-5 md:p-6'>
      <h2 className='text-foreground text-lg font-semibold'>결과</h2>
      <div className='space-y-2'>
        <BudgetResultItem text='총 예상 비용: 52만원 (±15%)' />
        <BudgetResultItem text='1인당 비용: 26만원' />
      </div>
    </section>
  );
};

export default BudgetResultsCard;
