import { notFound } from 'next/navigation';
import CourseTemplate from '@/components/region/course/templates/CourseTemplate';
import { getRegionCourse } from '@/utils/region';
import { REGIONS, COURSES } from '@/constants/region';

interface CoursePageProps {
  params: Promise<{ regionId: string; courseId: string }>;
}

export async function generateStaticParams() {
  const regions = Object.keys(REGIONS);
  const courses = Object.keys(COURSES);
  return regions.flatMap((regionId) =>
    courses.map((courseId) => ({ regionId, courseId })),
  );
}

export async function generateMetadata({ params }: CoursePageProps) {
  const { courseId } = await params;
  const course = getRegionCourse(courseId);
  if (!course) return {};
  return {
    title: `${course.title} | followtrip`,
    description: `${course.summary} · ${course.budgetRange}`,
  };
}

const CoursePage = async ({ params }: CoursePageProps) => {
  const { regionId, courseId } = await params;
  const course = getRegionCourse(courseId);
  const region = REGIONS[regionId];
  const regionName = region?.name ?? regionId;

  if (!course) notFound();

  return (
    <CourseTemplate
      regionId={regionId}
      regionName={regionName}
      course={course}
    />
  );
};

export default CoursePage;
