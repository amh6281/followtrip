import Image from 'next/image';
import Link from 'next/link';
import type { Trip } from '@/types/trip';

interface TripCardProps {
  trip: Trip;
}

const TripCard = ({ trip }: TripCardProps) => {
  const formatCost = (cost: number) => {
    if (cost >= 10000) {
      return `${(cost / 10000).toFixed(1)}만원`;
    }
    return `${cost.toLocaleString()}원`;
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}분`;
    if (mins === 0) return `${hours}시간`;
    return `${hours}시간 ${mins}분`;
  };

  return (
    <Link href={`/trips/${trip.id}`}>
      <article className='group border-border bg-background relative overflow-hidden rounded-lg border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg'>
        {/* 썸네일 */}
        <div className='bg-muted relative aspect-video w-full overflow-hidden'>
          <Image
            src={trip.thumbnail}
            alt={trip.title}
            fill
            className='object-cover transition-transform duration-300 group-hover:scale-105'
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
            <span className='bg-muted rounded-full px-2 py-1'>
              {trip.location}
            </span>
            <span className='bg-muted rounded-full px-2 py-1'>
              {trip.duration}
            </span>
            <span className='bg-muted rounded-full px-2 py-1'>
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
                  {formatTime(trip.totalTime)}
                </span>
              </div>
            </div>

            {/* 좋아요 */}
            <div className='flex items-center gap-1 text-sm'>
              <svg
                className='text-error h-4 w-4'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='text-foreground font-medium'>{trip.likes}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default TripCard;
