import { BudgetPrimaryButton } from '../atoms';
import { BudgetInputField } from '../molecules';

const BudgetInputCard = () => {
  return (
    <section className='border-border bg-background space-y-5 rounded-2xl border p-5 md:p-6'>
      <h2 className='text-foreground text-lg font-semibold'>입력</h2>

      <div className='grid grid-cols-1 gap-3 text-sm md:grid-cols-2 md:gap-4'>
        <BudgetInputField label='인원' placeholder='2명' />
        <BudgetInputField label='숙박비' placeholder='200,000' />
        <BudgetInputField label='교통비' placeholder='100,000' />
        <BudgetInputField label='식비' placeholder='180,000' />
        <BudgetInputField label='기타' placeholder='40,000' />
      </div>

      <BudgetPrimaryButton text='계산하기' />
    </section>
  );
};

export default BudgetInputCard;
