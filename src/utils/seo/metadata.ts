import type { Metadata } from 'next';
import type {
  CourseTemplate,
  Destination,
  LandingPage,
  RegionPlace,
} from '@/types/travel';
import {
  DEFAULT_OG_HEIGHT,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_WIDTH,
  SITE_LOCALE,
  SITE_NAME,
  absoluteUrl,
} from './site';

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
};

const buildRobots = (noindex = false): Metadata['robots'] =>
  noindex
    ? {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
          'max-image-preview': 'none',
          'max-snippet': -1,
          'max-video-preview': -1,
        },
      }
    : undefined;

export const buildPageMetadata = ({
  title,
  description,
  path = '/',
  noindex = false,
}: MetadataInput): Metadata => {
  const canonical = absoluteUrl(path);
  const image = absoluteUrl(DEFAULT_OG_IMAGE);

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    robots: buildRobots(noindex),
    openGraph: {
      type: 'website',
      locale: SITE_LOCALE,
      siteName: SITE_NAME,
      title,
      description,
      url: canonical ?? undefined,
      images: image
        ? [
            {
              url: image,
              width: DEFAULT_OG_WIDTH,
              height: DEFAULT_OG_HEIGHT,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
};

type LandingMetadataInput = {
  landing: LandingPage;
  destination?: Destination;
  path: string;
};

export const buildLandingMetadata = ({
  landing,
  destination,
  path,
}: LandingMetadataInput): Metadata =>
  buildPageMetadata({
    title: landing.heroTitle,
    description:
      landing.heroDescription ||
      `${destination?.name ?? '여행지'} 여행 의도에 맞춘 맞춤 가이드`,
    path,
    noindex: !landing.indexable,
  });

type CourseMetadataInput = {
  course: CourseTemplate;
  destination?: Destination;
  path: string;
};

export const buildCourseMetadata = ({
  course,
  destination,
  path,
}: CourseMetadataInput): Metadata =>
  buildPageMetadata({
    title: course.title,
    description: `${course.summary} 추천 예산 ${course.budget.text ?? '정보 확인 가능'}, 이동 방식 ${course.mobility}.${destination ? ` ${destination.name} 여행 코스 가이드.` : ''}`,
    path,
  });

type PlaceMetadataInput = {
  place: RegionPlace;
  destination?: Destination;
  path: string;
};

export const buildPlaceMetadata = ({
  place,
  destination,
  path,
}: PlaceMetadataInput): Metadata =>
  buildPageMetadata({
    title: `${place.name}${destination ? ` - ${destination.name}` : ''}`,
    description: `${place.address}. 권장 체류 ${place.stayMinutes.min}~${place.stayMinutes.max}분, 추천 시간 ${place.bestVisitText ?? place.bestTimeSlots.join(', ')}.`,
    path,
  });
