import Image from 'next/image';
import { formatCost } from '@/utils/format';
import type { Trip } from '@/types/trip';
import {
  HeartIcon,
  MapPinIcon,
  CalendarBlankIcon,
  UsersIcon,
  ClockIcon,
} from '@phosphor-icons/react/dist/ssr';

interface SummaryCardProps {
  trip: Trip;
}

const SummaryCard = ({ trip }: SummaryCardProps) => {
  return (
    <article className='border-border bg-background overflow-hidden rounded-2xl border'>
      <div className='bg-muted relative aspect-video w-full md:aspect-21/9'>
        <Image
          src={trip.thumbnail}
          alt={trip.title}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, 1024px'
          priority
        />
        <div
          className='pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent'
          aria-hidden
        />
      </div>
      <div className='p-5 md:p-7'>
        <h2 className='text-foreground mb-4 text-2xl leading-tight font-bold tracking-tight md:text-3xl'>
          {trip.title}
        </h2>
        <div className='mb-5 flex flex-wrap gap-2'>
          <span className='bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium'>
            <MapPinIcon size={16} weight='fill' />
            {trip.location}
          </span>
          <span className='bg-muted text-muted-foreground inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm'>
            <CalendarBlankIcon size={16} weight='duotone' />
            {trip.duration}
          </span>
          <span className='bg-muted text-muted-foreground inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm'>
            <UsersIcon size={16} weight='duotone' />
            {trip.travelType}
          </span>
        </div>
        <div className='border-border grid gap-3 border-t pt-5 sm:grid-cols-2'>
          <div className='bg-muted/50 flex items-center gap-3 rounded-xl px-4 py-3'>
            <span className='text-primary bg-primary/10 flex size-9 shrink-0 items-center justify-center rounded-lg'>
              <span className='text-xl font-bold'>￦</span>
            </span>
            <div className='min-w-0'>
              <p className='text-muted-foreground text-xs font-medium'>
                총 경비
              </p>
              <p className='text-foreground truncate font-semibold'>
                {formatCost(trip.totalCost)}
              </p>
            </div>
          </div>
          <div className='bg-muted/50 flex items-center gap-3 rounded-xl px-4 py-3'>
            <span className='text-primary bg-primary/10 flex size-9 shrink-0 items-center justify-center rounded-lg'>
              <ClockIcon size={20} weight='duotone' />
            </span>
            <div className='min-w-0'>
              <p className='text-muted-foreground text-xs font-medium'>
                총 소요 시간
              </p>
              <p className='text-foreground truncate font-semibold'>
                {trip.duration}
              </p>
            </div>
          </div>
        </div>
        <div className='text-muted-foreground bg-error/5 mt-4 flex items-center gap-2 rounded-xl px-4 py-2.5'>
          <HeartIcon size={20} className='text-error shrink-0' weight='fill' />
          <span className='text-foreground font-semibold'>{trip.likes}</span>
          <span className='text-sm'>좋아요</span>
        </div>
      </div>
    </article>
  );
};

export default SummaryCard;
