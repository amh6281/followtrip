import Image from 'next/image';
import {
  CurrencyCircleDollarIcon,
  ClockIcon,
} from '@phosphor-icons/react/dist/ssr';
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
    <div className='relative flex gap-4 pb-8 last:pb-0'>
      {/* 연결선 */}
      {!isLast && (
        <div
          className='border-primary/20 absolute w-px border-l-2'
          style={{
            left: 'calc(1.75rem - 1px)',
            top: '2.875rem',
            height: 'calc(100% - 2.875rem)',
          }}
          aria-hidden
        />
      )}

      {/* 시간 + 도트 */}
      <div className='text-muted-foreground flex w-14 shrink-0 flex-col items-center pt-0.5'>
        <span className='text-foreground text-sm font-semibold tabular-nums'>
          {step.time}
        </span>
        <span
          className='bg-primary border-background mt-2.5 flex size-7 shrink-0 items-center justify-center rounded-full border-2'
          aria-hidden
        />
      </div>

      {/* 콘텐츠 */}
      <div className='border-border bg-background min-w-0 flex-1 rounded-2xl border p-4 md:p-5'>
        <h3 className='text-foreground mb-3 text-lg leading-snug font-semibold'>
          {step.placeName}
        </h3>
        <div className='mb-3 flex flex-wrap gap-2'>
          <span className='bg-primary/10 text-primary rounded-lg px-2.5 py-1 text-xs font-medium'>
            {transportLabel[step.transport]}
          </span>
          <span className='bg-muted text-muted-foreground inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs'>
            <CurrencyCircleDollarIcon size={14} weight='duotone' />
            {formatCost(step.cost)}
          </span>
          {step.durationMinutes > 0 && (
            <span className='bg-muted text-muted-foreground inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs'>
              <ClockIcon size={14} weight='duotone' />
              {formatDuration(step.durationMinutes)}
            </span>
          )}
        </div>
        {step.memo && (
          <p className='text-muted-foreground border-primary/30 mb-3 border-l-2 pl-3 text-sm'>
            {step.memo}
          </p>
        )}
        {step.image && (
          <div className='bg-muted relative mt-3 aspect-video overflow-hidden rounded-xl'>
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
