import { AdSlot } from '@/components/common';
import { regionHubList } from '@/utils/region';
import {
  HeroSection,
  CuratedCoursesSection,
  RegionCoursesSection,
  ToolsSection,
} from '../organisms';

const HomeTemplate = () => {
  return (
    <main className='min-h-[60vh]'>
      <HeroSection regionCount={regionHubList.length} />

      <div className='mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14'>
        <div className='flex flex-col gap-12 lg:gap-16'>
          <AdSlot
            label='광고 슬롯 - 상단'
            className='from-muted/40 to-muted/10 bg-linear-to-r'
          />

          <CuratedCoursesSection />

          <RegionCoursesSection regions={regionHubList} />

          <ToolsSection />

          <AdSlot
            label='광고 슬롯 - 하단'
            className='from-muted/20 to-background bg-linear-to-r'
          />
        </div>
      </div>
    </main>
  );
};

export default HomeTemplate;
