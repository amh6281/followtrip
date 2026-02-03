import clsx from 'clsx';

interface FilterGroupProps {
  label: string;
  options: string[];
  value: string | null;
  onChange: (value: string | null) => void;
}

const FilterGroup = ({ label, options, value, onChange }: FilterGroupProps) => {
  const chipBase =
    'rounded-full px-3 py-1 text-sm transition-all whitespace-nowrap cursor-pointer';
  const chipActive = 'bg-primary text-primary-foreground shadow-sm';
  const chipInactive = 'bg-muted text-muted-foreground hover:bg-muted/80';

  return (
    <div className='flex flex-wrap items-center gap-2'>
      <span className='text-muted-foreground text-xs font-semibold tracking-wide uppercase'>
        {label}
      </span>

      <div className='flex flex-wrap gap-2'>
        {options.map((option) => (
          <button
            key={option}
            type='button'
            onClick={() => onChange(option === '전체' ? null : option)}
            className={clsx(
              chipBase,
              (option === '전체' ? value === null : value === option)
                ? chipActive
                : chipInactive,
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterGroup;
