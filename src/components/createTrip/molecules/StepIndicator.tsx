import { CREATE_TRIP_STEPS } from '@/constants/createTrip';
import clsx from 'clsx';

interface StepIndicatorProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

const StepIndicator = ({ currentStep, onStepChange }: StepIndicatorProps) => {
  return (
    <ol className='flex justify-between gap-1 max-md:gap-0.5'>
      {CREATE_TRIP_STEPS.map(({ id, label, icon: Icon }) => {
        const isActive = currentStep === id;
        return (
          <li key={id} className='min-w-0 flex-1'>
            <button
              type='button'
              onClick={() => onStepChange(id)}
              aria-current={isActive ? 'step' : undefined}
              className={clsx(
                'group flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border px-2 py-3 text-center transition-all duration-200 max-md:gap-1.5 max-md:py-2.5 max-md:text-xs',
                isActive
                  ? 'border-primary/30 bg-primary/5 text-foreground'
                  : 'text-muted-foreground hover:border-primary/30 hover:bg-primary/5 hover:text-foreground border-transparent',
              )}
            >
              <span
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 max-md:size-8 ${
                  isActive
                    ? 'bg-primary/20 text-primary'
                    : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                }`}
              >
                <Icon size={18} weight='duotone' className='max-md:size-4' />
              </span>
              <span className='line-clamp-2 text-sm leading-tight'>
                {label}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
};

export default StepIndicator;
