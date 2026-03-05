import { notFound } from 'next/navigation';
import RegionTemplate from '@/components/region/templates/RegionTemplate';
import { REGIONS } from '@/constants/region';
import { findRegionCoursesBySlugs } from '@/utils/region';

interface RegionPageProps {
  params: Promise<{ regionId: string }>;
}

const RegionPage = async ({ params }: RegionPageProps) => {
  const { regionId } = await params;
  const region = REGIONS[regionId];
  if (!region) notFound();

  const courses = findRegionCoursesBySlugs(region.highlightCourseSlugs);

  return (
    <RegionTemplate regionId={regionId} region={region} courses={courses} />
  );
};

export default RegionPage;
