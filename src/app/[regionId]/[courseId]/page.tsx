import { notFound } from 'next/navigation';
import CourseTemplate from '@/components/region/course/templates/CourseTemplate';
import { buildPageMetadata } from '@/utils/seo';
import {
  destinationById,
  destinationList,
  findCourseByRegionAndSlug,
  getFeaturedCoursesByRegionId,
} from '@/utils/selectors';

interface CoursePageProps {
  params: Promise<{ regionId: string; courseId: string }>;
}

// generateStaticParams에 정의된 course 경로만 허용하고 나머지는 404 처리
export const dynamicParams = false;

// 빌드 시 courses 경로 정적 생성
export async function generateStaticParams() {
  return destinationList.flatMap((destination) =>
    getFeaturedCoursesByRegionId(destination.slug).map((course) => ({
      regionId: destination.slug,
      courseId: course.slug,
    })),
  );
}

// 각 course 페이지에 대한 metadata 생성
export async function generateMetadata({ params }: CoursePageProps) {
  const { regionId, courseId } = await params;
  const course = findCourseByRegionAndSlug(regionId, courseId);
  const region = destinationById(regionId);
  const isValidCourse = getFeaturedCoursesByRegionId(regionId).some(
    (featuredCourse) => featuredCourse.id === course?.id,
  );
  if (!course || !region || !isValidCourse) return {};
  return buildPageMetadata({
    title: `${course.title} - ${region.name}`,
    description: course.summary,
    path: `/${regionId}/${courseId}`,
  });
}

const CoursePage = async ({ params }: CoursePageProps) => {
  const { regionId, courseId } = await params;
  const course = findCourseByRegionAndSlug(regionId, courseId);
  const region = destinationById(regionId);
  const isValidCourse = getFeaturedCoursesByRegionId(regionId).some(
    (featuredCourse) => featuredCourse.id === course?.id,
  );

  if (!course || !region || !isValidCourse) notFound();

  return (
    <CourseTemplate
      regionId={regionId}
      regionName={region.name}
      course={course}
    />
  );
};

export default CoursePage;
