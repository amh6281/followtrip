import {
  ClockIcon,
  CurrencyDollarIcon,
  MapPinIcon,
} from '@phosphor-icons/react/dist/ssr';
import { PlaceInfoItem } from '../molecules';
import type { RegionPlace } from '@/types/region';

interface PlaceBasicInfoSectionProps {
  place: RegionPlace;
}

const PlaceBasicInfoSection = ({ place }: PlaceBasicInfoSectionProps) => {
  return (
    <section className='border-border bg-background space-y-4 rounded-2xl border p-5 md:p-6'>
      <h2 className='text-foreground text-lg font-semibold md:text-xl'>
        기본 정보
      </h2>
      <dl className='text-muted-foreground grid gap-3 text-sm md:grid-cols-2'>
        <PlaceInfoItem
          icon={<ClockIcon className='size-5 shrink-0' />}
          label='운영시간'
          value={place.hours}
        />
        <PlaceInfoItem
          icon={<CurrencyDollarIcon className='size-5 shrink-0' />}
          label='입장료'
          value={place.fee}
        />
        <PlaceInfoItem
          icon={<MapPinIcon className='size-5 shrink-0' />}
          label='추천 체류·방문시간'
          value={`${place.stayDuration} · ${place.bestVisitTime}`}
          gridColSpan={2}
        />
      </dl>
    </section>
  );
};

export default PlaceBasicInfoSection;
