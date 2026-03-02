import { notFound } from 'next/navigation';
import { getRegionPlace, getRegionCourse } from '@/utils/region';
import { REGION_HUBS } from '@/constants/region';
import PlaceTemplate from '@/components/region/place/templates/PlaceTemplate';

interface PlacePageProps {
  params: Promise<{ regionId: string; placeId: string }>;
}

export async function generateStaticParams() {
  const regions = ['seoul', 'busan', 'jeju', 'gangneung'];
  const places = ['ikseondong', 'gwangjang-market', 'seongsu', 'bukchon'];
  return regions.flatMap((regionId) =>
    places.map((placeId) => ({ regionId, placeId })),
  );
}

export async function generateMetadata({ params }: PlacePageProps) {
  const { placeId } = await params;
  const place = getRegionPlace(placeId);
  if (!place) return {};
  return {
    title: `${place.name} | followtrip`,
    description: `${place.address} · ${place.stayDuration}`,
  };
}

const PlacePage = async ({ params }: PlacePageProps) => {
  const { regionId, placeId } = await params;
  const place = getRegionPlace(placeId);
  if (!place) notFound();

  const region = REGION_HUBS[regionId];
  const regionName = region?.name ?? regionId;

  const includedCourses = place.includedCourseSlugs
    .map((slug) => getRegionCourse(slug))
    .filter(Boolean);

  return (
    <PlaceTemplate
      place={place}
      regionId={regionId}
      regionName={regionName}
      includedCourses={includedCourses}
    />
  );
};

export default PlacePage;
