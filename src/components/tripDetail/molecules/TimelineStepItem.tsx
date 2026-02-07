import Image from 'next/image';
import { formatCost, formatDuration } from '@/utils/format';
import type { TripStep } from '@/types/trip';

interface TimelineStepItemProps {
  step: TripStep;
  isLast: boolean;
}

const transportLabel: Record<string, string> = {
  도보: '🚶 도보',
  대중교통: '🚌 대중교통',
  택시: '🚕 택시',
  렌터카: '🚗 렌터카',
};

const TimelineStepItem = ({ step, isLast }: TimelineStepItemProps) => {
  return (
    <div className='relative flex gap-4 pb-8'>
      {/* 연결선 */}
      {!isLast && (
        <div
          className='border-muted absolute top-13 left-[23px] h-[calc(100%-3.25rem)] w-px border-l-2'
          aria-hidden
        />
      )}

      {/* 시간 + 도트 */}
      <div className='text-muted-foreground flex w-12 shrink-0 flex-col items-center pt-0.5'>
        <span className='text-sm font-medium tabular-nums'>{step.time}</span>
        <span
          className='bg-primary border-background mt-2 h-6 w-6 shrink-0 rounded-full border-2'
          aria-hidden
        />
      </div>

      {/* 콘텐츠 */}
      <div className='border-border bg-background min-w-0 flex-1 rounded-xl border p-4'>
        <h3 className='text-foreground mb-2 font-semibold'>{step.placeName}</h3>
        <div className='text-muted-foreground mb-2 flex flex-wrap gap-2 text-sm'>
          <span>{transportLabel[step.transport]}</span>
          <span>{formatCost(step.cost)}</span>
          <span>{formatDuration(step.durationMinutes)}</span>
        </div>
        {step.memo && (
          <p className='text-muted-foreground text-sm'>{step.memo}</p>
        )}
        {step.image && (
          <div className='bg-muted relative mt-3 aspect-video overflow-hidden rounded-lg'>
            <Image
              src={step.image}
              alt={step.placeName}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 400px'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineStepItem;
