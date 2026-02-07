import Image from 'next/image';
import { formatCost } from '@/utils/format';
import type { Trip } from '@/types/trip';
import { HeartIcon } from '@phosphor-icons/react/dist/ssr';

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
      </div>
      <div className='p-5 md:p-6'>
        <h2 className='text-foreground mb-4 text-2xl font-bold md:text-[26px]'>
          {trip.title}
        </h2>
        {/* 메타 정보 */}
        <div className='text-muted-foreground mb-4 flex flex-wrap gap-2'>
          <span className='bg-muted rounded-full px-3 py-1.5 text-sm'>
            {trip.location}
          </span>
          <span className='bg-muted rounded-full px-3 py-1.5 text-sm'>
            {trip.duration}
          </span>
          <span className='bg-muted rounded-full px-3 py-1.5 text-sm'>
            {trip.travelType}
          </span>
        </div>
        <div className='border-border grid gap-4 border-t pt-4 sm:grid-cols-2'>
          <div className='flex justify-between gap-2'>
            <span className='text-muted-foreground'>총 경비</span>
            <span className='text-foreground font-semibold'>
              {formatCost(trip.totalCost)}
            </span>
          </div>
          <div className='flex justify-between gap-2'>
            <span className='text-muted-foreground'>총 소요 시간</span>
            <span className='text-foreground font-semibold'>
              {trip.duration}
            </span>
          </div>
        </div>
        <div className='text-muted-foreground mt-4 flex items-center gap-1.5 text-sm'>
          <HeartIcon size={24} className='text-error' weight='fill' />
          <span className='text-foreground font-medium'>{trip.likes}</span>
          <span>좋아요</span>
        </div>
      </div>
    </article>
  );
};

export default SummaryCard;
