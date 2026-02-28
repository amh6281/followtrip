interface BudgetBadgeProps {
  text: string;
}

const BudgetBadge = ({ text }: BudgetBadgeProps) => {
  return (
    <p className='text-primary border-primary/30 bg-primary/10 inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold tracking-wide uppercase'>
      {text}
    </p>
  );
};

export default BudgetBadge;
