import { CourseCard } from '@/components/common';
import { regionList } from '@/constants/region';
import { findRegionCoursesBySlugs } from '@/utils/region';

const CuratedCoursesSection = () => {
  // 지역별 대표 코스
  const regionCourses = regionList
    .map((region) => ({
      regionId: region.id,
      courses: findRegionCoursesBySlugs(region.highlightCourseSlugs),
    }))
    .filter(({ courses }) => courses.length > 0);

  // 추천 코스 6개 노출
  const featuredCourses = Array.from({ length: 6 }, (_, index) => {
    const regionCourse = regionCourses[index % regionCourses.length];
    const course =
      regionCourse?.courses[Math.floor(index / regionCourses.length)];

    if (!regionCourse || !course) {
      return null;
    }

    return {
      regionId: regionCourse.regionId,
      course,
    };
  }).filter(
    (
      item,
    ): item is {
      regionId: string;
      course: ReturnType<typeof findRegionCoursesBySlugs>[number];
    } => Boolean(item),
  );

  if (featuredCourses.length === 0) {
    return null;
  }

  return (
    <section className='space-y-5'>
      <h2 className='text-foreground text-lg font-semibold md:text-xl'>
        추천 코스
      </h2>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {featuredCourses.map(({ regionId, course }) => (
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
