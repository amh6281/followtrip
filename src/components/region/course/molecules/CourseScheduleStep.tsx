import Link from 'next/link';
import { MapPinIcon, CaretRightIcon } from '@phosphor-icons/react/dist/ssr';
import type { RegionPlace } from '@/types/region';

interface CourseScheduleStepProps {
  time: string;
  place: RegionPlace | null;
  placeId: string;
  regionId: string;
}

const CourseScheduleStep = ({
  time,
  place,
  placeId,
  regionId,
}: CourseScheduleStepProps) => {
  return (
    <div className='flex items-center gap-4 px-4 py-4 md:px-6'>
      <span className='text-muted-foreground shrink-0 text-sm font-medium tabular-nums'>
        {time}
      </span>
      {place ? (
        <Link
          href={`/${regionId}/place/${place.slug}`}
          className='text-foreground hover:text-primary flex flex-1 items-center gap-2 font-medium transition-colors'
        >
          <MapPinIcon className='size-4 shrink-0' />
          {place.name}
        </Link>
      ) : (
        <span className='text-foreground flex items-center gap-2'>
          <MapPinIcon className='size-4 shrink-0' />
          {placeId}
        </span>
      )}
      <CaretRightIcon className='text-muted-foreground size-4 shrink-0 cursor-pointer' />
    </div>
  );
};

export default CourseScheduleStep;
