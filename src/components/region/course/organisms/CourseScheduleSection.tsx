import { placeById } from '@/utils/selectors';
import { CourseScheduleStep } from '../molecules';
import type { CourseTemplate } from '@/types/travel';

interface CourseScheduleSectionProps {
  regionId: string;
  course: CourseTemplate;
  placeHrefBuilder?: (placeId: string, placeSlug?: string) => string;
}

const CourseScheduleSection = ({
  regionId,
  course,
  placeHrefBuilder,
}: CourseScheduleSectionProps) => {
  const resolvePlace = (placeId: string) => placeById(placeId);

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
                  place={resolvePlace(step.placeId)}
                  placeId={step.placeId}
                  regionId={regionId}
                  placeHref={placeHrefBuilder?.(step.placeId, step.placeId)}
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
