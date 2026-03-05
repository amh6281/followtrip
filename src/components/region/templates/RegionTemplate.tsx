import { AdSlot } from '@/components/common';
import {
  RegionHeaderSection,
  RegionCoursesSection,
  RegionFilterSection,
} from '../organisms';
import type { Region } from '@/types/region';
import type { RegionCourse } from '@/types/region';

interface RegionTemplateProps {
  regionId: string;
  region: Region;
  courses: RegionCourse[];
}

const RegionTemplate = ({ regionId, region, courses }: RegionTemplateProps) => {
  return (
    <main className='min-h-[60vh]'>
      <div className='mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14'>
        <div className='flex flex-col gap-10 md:gap-12'>
          <RegionHeaderSection region={region} />

          <AdSlot
            label='광고 슬롯 - 상단'
            className='from-muted/40 to-muted/10 bg-linear-to-r'
          />

          <RegionCoursesSection
            regionId={regionId}
            regionName={region.name}
            courses={courses}
          />

          <RegionFilterSection currentRegionId={regionId} />

          <AdSlot
            label='광고 슬롯 - 하단'
            className='from-muted/20 to-background bg-linear-to-r'
          />
        </div>
      </div>
    </main>
  );
};

export default RegionTemplate;
