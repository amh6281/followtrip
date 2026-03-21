import Script from 'next/script';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CourseTemplate from '@/components/region/course/templates/CourseTemplate';
import {
  buildBreadcrumbListJsonLd,
  buildCourseJsonLd,
  buildCourseMetadata,
} from '@/utils/seo';
import {
  courseList,
  destinationById,
  findCourseByRegionAndSlug,
} from '@/utils/selectors';
import type { RegionCourse } from '@/types/region';
import type {
  Companion,
  CourseTemplate as TravelCourseTemplate,
} from '@/types/travel';

interface DestinationCoursePageProps {
  params: Promise<{ slug: string; courseSlug: string }>;
}

const decodeRouteParam = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const companionLabels: Record<Companion, string> = {
  solo: '혼자 여행',
  couple: '커플',
  friends: '친구 여행',
  parents: '부모님과',
  kids: '아이와',
  family: '가족 여행',
};

const toLegacyCourse = (course: TravelCourseTemplate): RegionCourse => ({
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
  target: course.companions
    .map((companion) => companionLabels[companion] ?? companion)
    .join(' · '),
  days: course.days,
  tips: course.tips,
});

export const dynamicParams = false;

export async function generateStaticParams() {
  return courseList.map((course) => ({
    slug: course.regionId,
    courseSlug: course.slug,
  }));
}

export async function generateMetadata({
  params,
}: DestinationCoursePageProps): Promise<Metadata> {
  const { slug, courseSlug } = await params;
  const decodedSlug = decodeRouteParam(slug);
  const decodedCourseSlug = decodeRouteParam(courseSlug);
  const destination = destinationById(decodedSlug);
  const course = findCourseByRegionAndSlug(decodedSlug, decodedCourseSlug);

  if (!destination || !course) {
    return {};
  }

  return buildCourseMetadata({
    course,
    destination,
    path: `/destinations/${decodedSlug}/courses/${course.slug}`,
  });
}

const DestinationCoursePage = async ({
  params,
}: DestinationCoursePageProps) => {
  const { slug, courseSlug } = await params;
  const decodedSlug = decodeRouteParam(slug);
  const decodedCourseSlug = decodeRouteParam(courseSlug);
  const destination = destinationById(decodedSlug);
  const course = findCourseByRegionAndSlug(decodedSlug, decodedCourseSlug);

  if (!destination || !course) {
    notFound();
  }

  const breadcrumbJsonLd = buildBreadcrumbListJsonLd([
    { name: '홈', path: '/' },
    { name: '목적지', path: '/destinations' },
    { name: destination.name, path: `/destinations/${destination.slug}` },
    {
      name: course.title,
      path: `/destinations/${destination.slug}/courses/${course.slug}`,
    },
  ]);
  const courseJsonLd = buildCourseJsonLd({
    course,
    destination,
    path: `/destinations/${destination.slug}/courses/${course.slug}`,
  });

  return (
    <>
      <Script
        id={`destination-course-breadcrumb-${course.id}`}
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <Script
        id={`destination-course-jsonld-${course.id}`}
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd),
        }}
      />

      <CourseTemplate
        regionId={destination.slug}
        regionName={destination.name}
        course={toLegacyCourse(course)}
        backHref={`/destinations/${destination.slug}`}
        placeHrefBuilder={(placeId, placeSlug) =>
          `/destinations/${destination.slug}/places/${placeSlug ?? placeId}`
        }
      />
    </>
  );
};

export default DestinationCoursePage;
