import { CourseCard } from '@/components/common';
import type { CourseTemplate } from '@/types/travel';

interface RegionCoursesSectionProps {
  regionId: string;
  regionName: string;
  courses: CourseTemplate[];
}

const RegionCoursesSection = ({
  regionId,
  regionName,
  courses,
}: RegionCoursesSectionProps) => {
  return (
    <section className='space-y-4'>
      <h2 className='text-foreground text-lg font-semibold md:text-xl'>
        {regionName} 인기 코스
      </h2>
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

export default RegionCoursesSection;
