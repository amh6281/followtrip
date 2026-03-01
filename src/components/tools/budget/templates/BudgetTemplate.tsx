import { AdSlot } from '@/components/common';
import { BudgetContentSection, BudgetHeaderSection } from '../organisms';

const BudgetTemplate = () => {
  return (
    <main className='min-h-[60vh]'>
      <div className='mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14'>
        <div className='flex flex-col gap-10 md:gap-12'>
          <BudgetHeaderSection />

          <AdSlot
            label='광고 슬롯 - 상단'
            className='from-muted/40 to-muted/10 bg-linear-to-r'
          />

          <BudgetContentSection />

          <AdSlot
            label='광고 슬롯 - 하단'
            className='from-muted/20 to-background bg-linear-to-r'
          />
        </div>
      </div>
    </main>
  );
};

export default BudgetTemplate;
