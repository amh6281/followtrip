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

interface DestinationPlacePageProps {
  params: Promise<{ slug: string; placeId: string }>;
}

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

  const includedCourses = getCoursesByPlaceId(place.id);
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
        place={place}
        regionId={destination.slug}
        regionName={destination.name}
        includedCourses={includedCourses}
        backHref={`/destinations/${destination.slug}`}
        courseHrefBuilder={(course) =>
          `/destinations/${destination.slug}/courses/${course.slug}`
        }
        placeHrefBuilder={(nearbyPlace) =>
          `/destinations/${destination.slug}/places/${nearbyPlace.id}`
        }
      />
    </>
  );
};

export default DestinationPlacePage;
