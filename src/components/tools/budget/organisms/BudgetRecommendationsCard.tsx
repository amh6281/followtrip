const BudgetRecommendationsCard = () => {
  return (
    <section className='border-border bg-background space-y-4 rounded-2xl border p-5 md:p-6'>
      <h2 className='text-foreground text-lg font-semibold'>
        이 예산에 맞는 코스 추천
      </h2>
      <ul className='space-y-2 text-sm md:text-base'>
        <li className='text-muted-foreground'>서울 가성비 코스</li>
        <li className='text-muted-foreground'>부산 30만원 코스</li>
      </ul>
    </section>
  );
};

export default BudgetRecommendationsCard;
