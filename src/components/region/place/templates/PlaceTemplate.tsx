import { AdSlot } from '@/components/common';
import {
  PlaceHeaderSection,
  PlaceBasicInfoSection,
  PlaceTipsSection,
  PlaceIncludedCoursesSection,
} from '../organisms';
import type { RegionPlace, RegionCourse } from '@/types/region';

interface PlaceTemplateProps {
  place: RegionPlace;
  regionId: string;
  regionName: string;
  includedCourses: RegionCourse[];
}

const PlaceTemplate = ({
  place,
  regionId,
  regionName,
  includedCourses,
}: PlaceTemplateProps) => {
  return (
    <main className='min-h-[60vh]'>
      <PlaceHeaderSection
        place={place}
        regionId={regionId}
        regionName={regionName}
      />

      <div className='mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14'>
        <div className='flex flex-col gap-12 lg:gap-16'>
          <AdSlot
            label='광고 슬롯 - 상단'
            className='from-muted/40 to-muted/10 bg-linear-to-r'
          />

          <PlaceBasicInfoSection place={place} />

          <PlaceTipsSection tips={place.tips} />

          <PlaceIncludedCoursesSection
            courses={includedCourses}
            regionId={regionId}
          />

          <AdSlot
            label='광고 슬롯 - 하단'
            className='from-muted/20 to-background bg-linear-to-r'
          />
        </div>
      </div>
    </main>
  );
};

export default PlaceTemplate;
