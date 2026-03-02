import { MapPinIcon } from '@phosphor-icons/react/dist/ssr';
import { BackLink } from '@/components/common';
import type { RegionPlace } from '@/types/region';

interface PlaceHeaderSectionProps {
  place: RegionPlace;
  regionId: string;
  regionName: string;
}

const PlaceHeaderSection = ({
  place,
  regionId,
  regionName,
}: PlaceHeaderSectionProps) => {
  return (
    <section className='border-border relative overflow-hidden border-b px-4 py-10 md:px-6 md:py-14'>
      <div className='bg-sunset/15 absolute -top-28 -right-20 h-64 w-64 rounded-full blur-3xl' />
      <div className='bg-accent/20 absolute -bottom-24 -left-16 h-56 w-56 rounded-full blur-3xl' />

      <div className='relative mx-auto max-w-6xl space-y-6'>
        <BackLink href={`/${regionId}`}>{regionName}으로 돌아가기</BackLink>
        <div className='max-w-2xl space-y-3'>
          <h1 className='text-foreground text-3xl leading-tight font-bold tracking-tight md:text-4xl'>
            {place.name}
          </h1>
          <p className='text-muted-foreground flex items-center gap-2 text-sm'>
            <MapPinIcon className='size-4 shrink-0' />
            {place.address}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PlaceHeaderSection;
