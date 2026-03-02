import { getRegionPlace } from '@/utils/region';
import { CourseScheduleStep } from '../molecules';
import type { RegionCourse } from '@/types/region';

interface CourseScheduleSectionProps {
  regionId: string;
  course: RegionCourse;
}

const CourseScheduleSection = ({
  regionId,
  course,
}: CourseScheduleSectionProps) => {
  return (
    <section className='space-y-6'>
      <h2 className='text-foreground text-lg font-semibold md:text-xl'>일정</h2>
      <div className='space-y-8'>
        {course.days.map((day) => (
          <div key={day.title} className='space-y-4'>
            <h3 className='text-primary border-primary/30 bg-primary/10 inline-flex rounded-full border px-4 py-1.5 text-sm font-semibold'>
              {day.title}
            </h3>
            <div className='border-border bg-background divide-border divide-y overflow-hidden rounded-2xl border'>
              {day.schedule.map((step) => (
                <CourseScheduleStep
                  key={`${step.time}-${step.placeId}`}
                  time={step.time}
                  place={getRegionPlace(step.placeId)}
                  placeId={step.placeId}
                  regionId={regionId}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseScheduleSection;
