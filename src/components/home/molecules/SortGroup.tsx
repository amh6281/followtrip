import clsx from 'clsx';

interface SortGroupProps {
  value: 'latest' | 'popular';
  onChange: (value: 'latest' | 'popular') => void;
}

const SORT_OPTIONS = [
  { value: 'latest' as const, label: '최신순' },
  { value: 'popular' as const, label: '인기순' },
] as const;

const SortGroup = ({ value, onChange }: SortGroupProps) => {
  return (
    <div className='flex items-center gap-2'>
      <span className='text-muted-foreground text-xs font-semibold tracking-wide uppercase'>
        정렬
      </span>

      <div className='bg-muted flex gap-1 rounded-lg p-1'>
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.value}
            type='button'
            onClick={() => onChange(option.value)}
            className={clsx(
              'cursor-pointer rounded-md px-3 py-1 text-sm transition-colors',
              value === option.value
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-background/60',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortGroup;
