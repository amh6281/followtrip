import { REGION_HUBS } from '@/constants/region';
import { RegionFilterChip } from '../molecules';

interface RegionFilterSectionProps {
  currentRegionId: string;
}

const RegionFilterSection = ({ currentRegionId }: RegionFilterSectionProps) => {
  return (
    <section className='space-y-4'>
      <h2 className='text-foreground text-lg font-semibold md:text-xl'>
        지역별 보기
      </h2>
      <div className='flex flex-wrap gap-2'>
        {Object.values(REGION_HUBS).map((region) => (
          <RegionFilterChip
            key={region.id}
            regionId={region.id}
            name={region.name}
            isActive={region.id === currentRegionId}
          />
        ))}
      </div>
    </section>
  );
};

export default RegionFilterSection;
