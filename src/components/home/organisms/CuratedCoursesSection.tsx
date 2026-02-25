import { CourseCard } from '../molecules';
import type { RegionCourse } from '@/types/region';

interface CuratedCoursesSectionProps {
  courses: RegionCourse[];
  regionId: string;
  regionName: string;
}

const CuratedCoursesSection = ({
  courses,
  regionId,
  regionName,
}: CuratedCoursesSectionProps) => {
  return (
    <section className='space-y-5 md:space-y-6'>
      <div className='flex items-baseline justify-between gap-4'>
        <h2 className='text-foreground text-lg font-semibold md:text-xl'>
          추천 코스
        </h2>
        <span className='text-muted-foreground hidden text-sm md:inline'>
          {regionName}에서 추천하는 코스
        </span>
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {courses.map((course) => (
          <CourseCard
            key={course.slug}
            course={course}
            href={`/${regionId}/${course.slug}`}
          />
        ))}
      </div>
    </section>
  );
};

export default CuratedCoursesSection;
