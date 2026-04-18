import { notFound } from 'next/navigation';
import RegionTemplate from '@/components/region/templates/RegionTemplate';
import { buildPageMetadata } from '@/utils/seo';
import {
  destinationById,
  destinationList,
  getFeaturedCoursesByRegionId,
} from '@/utils/selectors';

interface RegionPageProps {
  params: Promise<{ regionId: string }>;
}

// generateStaticParams에 정의된 region 경로만 허용하고 나머지는 404 처리
export const dynamicParams = false;

// 빌드 시 regions 경로 정적 생성
export async function generateStaticParams() {
  return destinationList.map((destination) => ({ regionId: destination.slug }));
}

// 각 region 페이지에 대한 metadata 생성
export async function generateMetadata({ params }: RegionPageProps) {
  const { regionId } = await params;
  const region = destinationById(regionId);
  if (!region) return {};
  return buildPageMetadata({
    title: `${region.name} 여행 가이드`,
    description: region.heroSummary,
    path: `/${regionId}`,
  });
}

const RegionPage = async ({ params }: RegionPageProps) => {
  const { regionId } = await params;
  const region = destinationById(regionId);
  if (!region) notFound();

  const courses = getFeaturedCoursesByRegionId(regionId);

  return (
    <RegionTemplate regionId={regionId} region={region} courses={courses} />
  );
};

export default RegionPage;
