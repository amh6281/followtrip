import { notFound } from 'next/navigation';
import RegionTemplate from '@/components/region/templates/RegionTemplate';
import { REGIONS } from '@/constants/region';
import { buildPageMetadata } from '@/lib/seo';
import { findRegionCoursesBySlugs } from '@/utils/region';

interface RegionPageProps {
  params: Promise<{ regionId: string }>;
}

// generateStaticParams에 정의된 region 경로만 허용하고 나머지는 404 처리
export const dynamicParams = false;

// 빌드 시 regions 경로 정적 생성
export async function generateStaticParams() {
  return Object.keys(REGIONS).map((regionId) => ({ regionId }));
}

// 각 region 페이지에 대한 metadata 생성
export async function generateMetadata({ params }: RegionPageProps) {
  const { regionId } = await params;
  const region = REGIONS[regionId];
  if (!region) return {};
  return buildPageMetadata({
    title: `${region.name} 여행 가이드`,
    description: `${region.subtitle}. 추천 일정 ${region.recommendedDuration}, 평균 예산 ${region.averageBudget}.`,
    path: `/${regionId}`,
  });
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
