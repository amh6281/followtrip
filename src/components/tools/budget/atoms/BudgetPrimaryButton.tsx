interface BudgetPrimaryButtonProps {
  text: string;
}

const BudgetPrimaryButton = ({ text }: BudgetPrimaryButtonProps) => {
  return (
    <button className='bg-foreground text-background hover:bg-foreground/90 w-full cursor-pointer rounded-xl px-4 py-3 text-sm font-semibold transition-colors'>
      {text}
    </button>
  );
};

export default BudgetPrimaryButton;
