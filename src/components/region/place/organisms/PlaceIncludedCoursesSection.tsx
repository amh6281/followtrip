import { PlaceCourseLink } from '../molecules';
import type { RegionCourse } from '@/types/region';

interface PlaceIncludedCoursesSectionProps {
  courses: RegionCourse[];
  regionId: string;
}

const PlaceIncludedCoursesSection = ({
  courses,
  regionId,
}: PlaceIncludedCoursesSectionProps) => {
  if (courses.length === 0) return null;

  return (
    <section className='space-y-4'>
      <h2 className='text-foreground text-lg font-semibold md:text-xl'>
        포함된 코스
      </h2>
      <div className='flex flex-wrap gap-2'>
        {courses.map((course) => (
          <PlaceCourseLink
            key={course.slug}
            href={`/${regionId}/${course.slug}`}
            title={course.title}
          />
        ))}
      </div>
    </section>
  );
};

export default PlaceIncludedCoursesSection;
