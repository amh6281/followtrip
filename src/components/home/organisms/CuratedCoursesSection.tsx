import { CourseCard } from '@/components/common';
import { regionList } from '@/constants/region';
import { findRegionCoursesBySlugs } from '@/utils/region';

const CuratedCoursesSection = () => {
  const featuredRegion = regionList[0];

  if (!featuredRegion) {
    return null;
  }

  const featuredCourses = findRegionCoursesBySlugs(
    featuredRegion.highlightCourseSlugs,
  ).slice(0, 3);

  return (
    <section className='space-y-5'>
      <h2 className='text-foreground text-lg font-semibold md:text-xl'>
        추천 코스
      </h2>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {featuredCourses.map((course) => (
          <CourseCard
            key={course.slug}
            course={course}
            href={`/${featuredRegion.id}/${course.slug}`}
          />
        ))}
      </div>
    </section>
  );
};

export default CuratedCoursesSection;
