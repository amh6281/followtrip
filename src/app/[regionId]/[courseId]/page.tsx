import { notFound } from 'next/navigation';
import CourseTemplate from '@/components/region/course/templates/CourseTemplate';
import { getRegionCourse } from '@/utils/region';
import { REGIONS } from '@/constants/region';
import { buildPageMetadata } from '@/lib/seo';

interface CoursePageProps {
  params: Promise<{ regionId: string; courseId: string }>;
}

// generateStaticParams에 정의된 course 경로만 허용하고 나머지는 404 처리
export const dynamicParams = false;

// 빌드 시 courses 경로 정적 생성
export async function generateStaticParams() {
  return Object.values(REGIONS).flatMap((region) =>
    region.highlightCourseSlugs.map((courseId) => ({
      regionId: region.id,
      courseId,
    })),
  );
}

// 각 course 페이지에 대한 metadata 생성
export async function generateMetadata({ params }: CoursePageProps) {
  const { regionId, courseId } = await params;
  const course = getRegionCourse(courseId);
  const region = REGIONS[regionId];
  const isValidCourse = region?.highlightCourseSlugs.includes(courseId);
  if (!course || !region || !isValidCourse) return {};
  return buildPageMetadata({
    title: `${course.title} - ${region.name}`,
    description: `${course.summary} 추천 예산 ${course.budgetRange}, 난이도 ${course.difficulty}.`,
    path: `/${regionId}/${courseId}`,
  });
}

const CoursePage = async ({ params }: CoursePageProps) => {
  const { regionId, courseId } = await params;
  const course = getRegionCourse(courseId);
  const region = REGIONS[regionId];
  const isValidCourse = region?.highlightCourseSlugs.includes(courseId);

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
