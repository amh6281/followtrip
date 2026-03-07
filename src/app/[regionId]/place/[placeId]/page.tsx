import { notFound } from 'next/navigation';
import { getRegionPlace, getRegionCourse } from '@/utils/region';
import { REGIONS } from '@/constants/region';
import PlaceTemplate from '@/components/region/place/templates/PlaceTemplate';
import { buildPageMetadata } from '@/lib/seo';

interface PlacePageProps {
  params: Promise<{ regionId: string; placeId: string }>;
}

// generateStaticParams에 정의된 place 경로만 허용하고 나머지는 404 처리
export const dynamicParams = false;

// 빌드 시 places 경로 정적 생성
export async function generateStaticParams() {
  return Object.values(REGIONS).flatMap((region) =>
    region.placeSlugs.map((placeId) => ({
      regionId: region.id,
      placeId,
    })),
  );
}

// 각 place 페이지에 대한 metadata 생성
export async function generateMetadata({ params }: PlacePageProps) {
  const { regionId, placeId } = await params;
  const place = getRegionPlace(placeId);
  const region = REGIONS[regionId];
  const isValidPlace = region?.placeSlugs.includes(placeId);
  if (!place || !region || !isValidPlace) return {};
  return buildPageMetadata({
    title: `${place.name} - ${region.name}`,
    description: `${place.address}. 권장 체류 시간 ${place.stayDuration}, 추천 방문 시간 ${place.bestVisitTime}.`,
    path: `/${regionId}/place/${placeId}`,
  });
}

const PlacePage = async ({ params }: PlacePageProps) => {
  const { regionId, placeId } = await params;
  const place = getRegionPlace(placeId);
  const region = REGIONS[regionId];
  const isValidPlace = region?.placeSlugs.includes(placeId);

  if (!place || !region || !isValidPlace) notFound();

  const includedCourses = place.includedCourseSlugs
    .map((slug) => getRegionCourse(slug))
    .filter(Boolean);

  return (
    <PlaceTemplate
      place={place}
      regionId={regionId}
      regionName={region.name}
      includedCourses={includedCourses}
    />
  );
};

export default PlacePage;
