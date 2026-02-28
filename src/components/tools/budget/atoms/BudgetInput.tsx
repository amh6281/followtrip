interface BudgetInputProps {
  placeholder: string;
}

const BudgetInput = ({ placeholder }: BudgetInputProps) => {
  return (
    <input
      className='border-border bg-background placeholder:text-muted-foreground text-foreground focus:border-primary/40 mt-1 w-full rounded-xl border px-3 py-2.5 transition-colors outline-none'
      placeholder={placeholder}
    />
  );
};

export default BudgetInput;
