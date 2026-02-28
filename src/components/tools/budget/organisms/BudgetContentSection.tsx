import BudgetInputCard from './BudgetInputCard';
import BudgetRecommendationsCard from './BudgetRecommendationsCard';
import BudgetResultsCard from './BudgetResultsCard';

const BudgetContentSection = () => {
  return (
    <section className='grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]'>
      <BudgetInputCard />

      <div className='flex flex-col gap-6'>
        <BudgetResultsCard />
        <BudgetRecommendationsCard />
      </div>
    </section>
  );
};

export default BudgetContentSection;
