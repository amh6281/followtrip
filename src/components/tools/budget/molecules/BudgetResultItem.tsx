interface BudgetResultItemProps {
  text: string;
}

const BudgetResultItem = ({ text }: BudgetResultItemProps) => {
  return <p className='text-muted-foreground text-sm md:text-base'>{text}</p>;
};

export default BudgetResultItem;
