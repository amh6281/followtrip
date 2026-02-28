import { BudgetInput } from '../atoms';

interface BudgetInputFieldProps {
  label: string;
  placeholder: string;
}

const BudgetInputField = ({ label, placeholder }: BudgetInputFieldProps) => {
  return (
    <label className='text-muted-foreground flex flex-col gap-1 md:col-span-2'>
      {label}
      <BudgetInput placeholder={placeholder} />
    </label>
  );
};

export default BudgetInputField;
