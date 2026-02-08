import {
  CalendarBlankIcon,
  ListChecksIcon,
} from '@phosphor-icons/react/dist/ssr';
import type { TripStep } from '@/types/trip';
import TimelineStepItem from '../molecules/TimelineStepItem';

interface TimelineProps {
  steps: TripStep[];
}

const Timeline = ({ steps }: TimelineProps) => {
  const sorted = [...steps].sort((a, b) => a.order - b.order);

  if (sorted.length === 0) {
    return (
      <div className='border-border bg-muted/30 mb-16 flex flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-12 max-md:mb-14'>
        <span className='bg-muted text-muted-foreground mb-3 flex size-12 items-center justify-center rounded-full'>
          <CalendarBlankIcon className='size-6' weight='duotone' />
        </span>
        <p className='text-muted-foreground text-center text-sm'>
          등록된 일정이 없어요.
        </p>
      </div>
    );
  }

  return (
    <section className='mb-16 max-md:mb-14' aria-labelledby='timeline-title'>
      <h2
        id='timeline-title'
        className='text-foreground mb-6 flex items-center gap-3 text-2xl font-semibold tracking-tight max-md:text-xl'
      >
        <span className='bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl'>
          <ListChecksIcon size={20} weight='duotone' />
        </span>
        일정
      </h2>
      <div className='relative'>
        {sorted.map((step, i) => (
          <TimelineStepItem
            key={step.id}
            step={step}
            isLast={i === sorted.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default Timeline;
