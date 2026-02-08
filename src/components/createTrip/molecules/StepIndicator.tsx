import { CREATE_TRIP_STEPS } from '@/constants/createTrip';

const StepIndicator = () => {
  return (
    <ol className='flex justify-between gap-1 max-md:gap-0.5'>
      {CREATE_TRIP_STEPS.map(({ id, label, icon: Icon }) => (
        <li key={id} className='min-w-0 flex-1'>
          <button
            type='button'
            className='hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-foreground group flex w-full flex-col items-center gap-2 rounded-xl border border-transparent px-2 py-3 text-center transition-all duration-200 max-md:gap-1.5 max-md:py-2.5 max-md:text-xs'
          >
            <span className='bg-primary/10 text-primary group-hover:bg-primary/20 flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 max-md:size-8'>
              <Icon size={18} weight='duotone' className='max-md:size-4' />
            </span>
            <span className='line-clamp-2 text-sm leading-tight'>{label}</span>
          </button>
        </li>
      ))}
    </ol>
  );
};

export default StepIndicator;
