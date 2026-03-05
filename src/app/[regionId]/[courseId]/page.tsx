import { notFound } from 'next/navigation';
import CourseTemplate from '@/components/region/course/templates/CourseTemplate';
import { getRegionCourse } from '@/utils/region';
import { REGIONS } from '@/constants/region';

interface CoursePageProps {
  params: Promise<{ regionId: string; courseId: string }>;
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
