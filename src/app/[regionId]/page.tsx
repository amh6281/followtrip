import { notFound } from 'next/navigation';
import RegionTemplate from '@/components/region/templates/RegionTemplate';
import { REGION_HUBS } from '@/constants/region';
import { findRegionCoursesBySlugs } from '@/utils/region';

interface RegionPageProps {
  params: Promise<{ regionId: string }>;
}

export async function generateStaticParams() {
  return Object.keys(REGION_HUBS).map((regionId) => ({ regionId }));
}

const RegionPage = async ({ params }: RegionPageProps) => {
  const { regionId } = await params;
  const region = REGION_HUBS[regionId];
  if (!region) notFound();

  const courses = findRegionCoursesBySlugs(region.highlightCourseSlugs);

  return (
    <RegionTemplate regionId={regionId} region={region} courses={courses} />
  );
};

export default RegionPage;
