import Image from 'next/image';
import Link from 'next/link';
import { formatCost } from '@/utils/format';
import type { Trip } from '@/types/trip';
import { HeartIcon } from '@phosphor-icons/react/dist/ssr';

interface TripCardProps {
  trip: Trip;
}

const TripCard = ({ trip }: TripCardProps) => {
  return (
    <Link href={`/trips/${trip.id}`}>
      <article className='border-border bg-background relative overflow-hidden rounded-2xl border'>
        {/* 썸네일 */}
        <div className='bg-muted relative aspect-video w-full overflow-hidden'>
          <Image
            src={trip.thumbnail}
            alt={trip.title}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>

        {/* 카드 내용 */}
        <div className='p-4'>
          {/* 제목 */}
          <h3 className='text-foreground mb-2 line-clamp-1 text-lg font-semibold'>
            {trip.title}
          </h3>

          {/* 메타 정보 */}
          <div className='text-muted-foreground mb-3 flex flex-wrap gap-2 text-sm'>
            <span className='bg-muted rounded-full px-2.5 py-1'>
              {trip.location}
            </span>
            <span className='bg-muted rounded-full px-2.5 py-1'>
              {trip.duration}
            </span>
            <span className='bg-muted rounded-full px-2.5 py-1'>
              {trip.travelType}
            </span>
          </div>

          {/* 통계 정보 */}
          <div className='border-border flex items-center justify-between border-t pt-3'>
            <div className='flex gap-4 text-sm'>
              <div className='flex items-center gap-1'>
                <span className='text-muted-foreground'>경비</span>
                <span className='text-foreground font-medium'>
                  {formatCost(trip.totalCost)}
                </span>
              </div>
              <div className='flex items-center gap-1'>
                <span className='text-muted-foreground'>소요</span>
                <span className='text-foreground font-medium'>
                  {trip.duration}
                </span>
              </div>
            </div>

            {/* 좋아요 */}
            <div className='flex items-center gap-1 text-sm'>
              <HeartIcon size={18} className='text-error' weight='fill' />
              <span className='text-foreground font-medium'>{trip.likes}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default TripCard;
