import type { CourseTemplate, Destination, RegionPlace } from '@/types/travel';
import { SITE_NAME, absoluteUrl } from './site';

type BreadcrumbItem = {
  name: string;
  path: string;
};

export const buildBreadcrumbListJsonLd = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path) ?? item.path,
  })),
});

type DestinationJsonLdInput = {
  destination: Destination;
  path: string;
};

export const buildDestinationJsonLd = ({
  destination,
  path,
}: DestinationJsonLdInput) => ({
  '@context': 'https://schema.org',
  '@type': 'TravelGuide',
  name: `${destination.name} 여행 가이드`,
  description: destination.heroSummary,
  url: absoluteUrl(path) ?? path,
  about: {
    '@type': 'Place',
    name: destination.name,
    address: destination.area,
  },
  keywords: [...destination.themes, ...destination.foodKeywords].join(', '),
  dateModified: destination.updatedAt,
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
  },
});

type CourseJsonLdInput = {
  course: CourseTemplate;
  destination?: Destination;
  path: string;
};

export const buildCourseJsonLd = ({
  course,
  destination,
  path,
}: CourseJsonLdInput) => ({
  '@context': 'https://schema.org',
  '@type': 'TouristTrip',
  name: course.title,
  description: course.summary,
  url: absoluteUrl(path) ?? path,
  touristType: course.companions.join(', '),
  itinerary: course.days.map((day) => ({
    '@type': 'ItemList',
    name: day.title,
    itemListElement: day.schedule.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.placeId,
    })),
  })),
  offers: course.budget.max
    ? {
        '@type': 'Offer',
        priceCurrency: course.budget.currency,
        lowPrice: course.budget.min,
        highPrice: course.budget.max,
      }
    : undefined,
  provider: {
    '@type': 'Organization',
    name: SITE_NAME,
  },
  areaServed: destination?.name,
});

type PlaceJsonLdInput = {
  place: RegionPlace;
  destination?: Destination;
  path: string;
};

export const buildPlaceJsonLd = ({
  place,
  destination,
  path,
}: PlaceJsonLdInput) => ({
  '@context': 'https://schema.org',
  '@type': 'TouristAttraction',
  name: place.name,
  description:
    place.summary ??
    `${destination?.name ?? '여행지'}에서 들르기 좋은 ${place.category} 스팟`,
  url: absoluteUrl(path) ?? path,
  address: place.address,
  touristType: place.companions.join(', '),
  isAccessibleForFree: place.feeText.includes('무료'),
  publicAccess: true,
});
