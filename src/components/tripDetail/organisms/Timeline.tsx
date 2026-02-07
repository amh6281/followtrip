import type { TripStep } from '@/types/trip';
import TimelineStepItem from '../molecules/TimelineStepItem';

interface TimelineProps {
  steps: TripStep[];
}

const Timeline = ({ steps }: TimelineProps) => {
  const sorted = [...steps].sort((a, b) => a.order - b.order);

  if (sorted.length === 0) {
    return (
      <p className='text-muted-foreground py-8 text-center text-sm'>
        등록된 일정이 없어요.
      </p>
    );
  }

  return (
    <div className='relative'>
      {sorted.map((step, i) => (
        <TimelineStepItem
          key={step.id}
          step={step}
          isLast={i === sorted.length - 1}
        />
      ))}
    </div>
  );
};

export default Timeline;
