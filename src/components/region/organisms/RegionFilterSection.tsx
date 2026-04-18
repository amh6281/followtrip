import { destinationList } from '@/utils/selectors';
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
        {destinationList.map((region) => (
          <RegionFilterChip
            key={region.slug}
            regionId={region.slug}
            name={region.name}
            isActive={region.slug === currentRegionId}
          />
        ))}
      </div>
    </section>
  );
};

export default RegionFilterSection;
