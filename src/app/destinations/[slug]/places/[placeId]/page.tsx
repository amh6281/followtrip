import Script from 'next/script';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PlaceTemplate from '@/components/region/place/templates/PlaceTemplate';
import {
  buildBreadcrumbListJsonLd,
  buildPlaceJsonLd,
  buildPlaceMetadata,
} from '@/utils/seo';
import {
  destinationById,
  getCoursesByPlaceId,
  placeList,
  placeById,
} from '@/utils/selectors';
import type {
  RegionCourse,
  RegionPlace as LegacyRegionPlace,
} from '@/types/region';
import type { CourseTemplate, RegionPlace } from '@/types/travel';

interface DestinationPlacePageProps {
  params: Promise<{ slug: string; placeId: string }>;
}

const toLegacyPlace = (place: RegionPlace): LegacyRegionPlace => ({
  slug: place.slug,
  name: place.name,
  address: place.address,
  hours: place.legacy?.hours ?? place.hoursText,
  fee: place.legacy?.fee ?? place.feeText,
  stayDuration:
    place.legacy?.stayDuration ??
    `${place.stayMinutes.min}~${place.stayMinutes.max}분`,
  bestVisitTime:
    place.legacy?.bestVisitTime ??
    place.bestVisitText ??
    place.bestTimeSlots[0],
  tips: place.tips,
  nearbyPlaceSlugs: place.legacy?.nearbyPlaceSlugs ?? place.nearbyPlaceIds,
  includedCourseSlugs: [],
});

const toLegacyCourse = (course: CourseTemplate): RegionCourse => ({
  slug: course.slug,
  title: course.title,
  summary: course.summary,
  budgetRange: course.budget.text ?? '예산 정보 준비 중',
  difficulty:
    course.difficulty === 1
      ? '쉬움'
      : course.difficulty === 2
        ? '보통'
        : '높음',
  target: course.companions.join(' · '),
  days: course.days,
  tips: course.tips,
});

export const dynamicParams = false;

export async function generateStaticParams() {
  return placeList.map((place) => ({
    slug: place.regionId,
    placeId: place.id,
  }));
}

export async function generateMetadata({
  params,
}: DestinationPlacePageProps): Promise<Metadata> {
  const { slug, placeId } = await params;
  const destination = destinationById(slug);
  const place = placeById(placeId);

  if (!destination || !place || place.regionId !== slug) {
    return {};
  }

  return buildPlaceMetadata({
    place,
    destination,
    path: `/destinations/${slug}/places/${place.id}`,
  });
}

const DestinationPlacePage = async ({ params }: DestinationPlacePageProps) => {
  const { slug, placeId } = await params;
  const destination = destinationById(slug);
  const place = placeById(placeId);

  if (!destination || !place || place.regionId !== slug) {
    notFound();
  }

  const includedCourses = getCoursesByPlaceId(place.id).map(toLegacyCourse);
  const breadcrumbJsonLd = buildBreadcrumbListJsonLd([
    { name: '홈', path: '/' },
    { name: '목적지', path: '/destinations' },
    { name: destination.name, path: `/destinations/${destination.slug}` },
    {
      name: place.name,
      path: `/destinations/${destination.slug}/places/${place.id}`,
    },
  ]);
  const placeJsonLd = buildPlaceJsonLd({
    place,
    destination,
    path: `/destinations/${destination.slug}/places/${place.id}`,
  });

  return (
    <>
      <Script
        id={`destination-place-breadcrumb-${place.id}`}
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <Script
        id={`destination-place-jsonld-${place.id}`}
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(placeJsonLd),
        }}
      />

      <PlaceTemplate
        place={toLegacyPlace(place)}
        regionId={destination.slug}
        regionName={destination.name}
        includedCourses={includedCourses}
        backHref={`/destinations/${destination.slug}`}
        courseHrefBuilder={(course) => `/${destination.slug}/${course.slug}`}
        placeHrefBuilder={(nearbyPlace) =>
          `/destinations/${destination.slug}/places/${nearbyPlace.slug}`
        }
      />
    </>
  );
};

export default DestinationPlacePage;
