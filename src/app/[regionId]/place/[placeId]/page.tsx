import { notFound } from 'next/navigation';
import PlaceTemplate from '@/components/region/place/templates/PlaceTemplate';
import { buildPageMetadata } from '@/utils/seo';
import {
  destinationById,
  destinationList,
  getCoursesByPlaceId,
  getPlacesByRegionId,
  placeById,
} from '@/utils/selectors';

interface PlacePageProps {
  params: Promise<{ regionId: string; placeId: string }>;
}

// generateStaticParams에 정의된 place 경로만 허용하고 나머지는 404 처리
export const dynamicParams = false;

// 빌드 시 places 경로 정적 생성
export async function generateStaticParams() {
  return destinationList.flatMap((destination) =>
    getPlacesByRegionId(destination.slug).map((place) => ({
      regionId: destination.slug,
      placeId: place.id,
    })),
  );
}

// 각 place 페이지에 대한 metadata 생성
export async function generateMetadata({ params }: PlacePageProps) {
  const { regionId, placeId } = await params;
  const place = placeById(placeId);
  const region = destinationById(regionId);
  const isValidPlace = place?.regionId === regionId;
  if (!place || !region || !isValidPlace) return {};
  return buildPageMetadata({
    title: `${place.name} - ${region.name}`,
    description: `${place.address}. ${place.bestVisitText ?? place.hoursText}`,
    path: `/${regionId}/place/${placeId}`,
  });
}

const PlacePage = async ({ params }: PlacePageProps) => {
  const { regionId, placeId } = await params;
  const place = placeById(placeId);
  const region = destinationById(regionId);
  const isValidPlace = place?.regionId === regionId;

  if (!place || !region || !isValidPlace) notFound();

  const includedCourses = getCoursesByPlaceId(place.id);

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
