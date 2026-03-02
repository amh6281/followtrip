import { AdSlot, ToolLinkCard } from '@/components/common';
import {
  CourseHeaderSection,
  CourseSummaryCard,
  CourseScheduleSection,
  CourseTipsSection,
} from '../organisms';
import type { RegionCourse } from '@/types/region';

interface CourseTemplateProps {
  regionId: string;
  regionName: string;
  course: RegionCourse;
}

const CourseTemplate = ({
  regionId,
  regionName,
  course,
}: CourseTemplateProps) => {
  return (
    <main className='min-h-[60vh]'>
      <CourseHeaderSection
        regionId={regionId}
        regionName={regionName}
        course={course}
      />

      <div className='mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14'>
        <div className='flex flex-col gap-12 lg:gap-16'>
          <AdSlot
            label='광고 슬롯 - 상단'
            className='from-muted/40 to-muted/10 bg-linear-to-r'
          />

          <CourseSummaryCard course={course} />

          <CourseScheduleSection regionId={regionId} course={course} />

          <ToolLinkCard
            href='/tools/budget'
            title='이 코스로 예산 계산하기'
            description='인원·숙박·교통·식비를 입력해 예상 비용을 확인하세요'
            className='bg-background hover:translate-y-0'
          />

          <CourseTipsSection tips={course.tips} />

          <AdSlot
            label='광고 슬롯 - 하단'
            className='from-muted/20 to-background bg-linear-to-r'
          />
        </div>
      </div>
    </main>
  );
};

export default CourseTemplate;
