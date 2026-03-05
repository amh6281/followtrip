import { RegionLinkCard } from '../molecules';
import type { Region } from '@/types/region';

interface RegionCoursesSectionProps {
  regionList: Region[];
}

const RegionCoursesSection = ({ regionList }: RegionCoursesSectionProps) => {
  return (
    <section className='space-y-5'>
      <h2 className='text-foreground text-lg font-semibold md:text-xl'>
        지역별 여행 코스
      </h2>
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
        {regionList.map((region) => (
          <RegionLinkCard
            key={region.id}
            regionId={region.id}
            name={region.name}
          />
        ))}
      </div>
    </section>
  );
};

export default RegionCoursesSection;
