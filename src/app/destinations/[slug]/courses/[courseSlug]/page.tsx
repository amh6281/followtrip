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
        course={course}
        backHref={`/destinations/${destination.slug}`}
        placeHrefBuilder={(placeId, placeSlug) =>
          `/destinations/${destination.slug}/places/${placeSlug ?? placeId}`
        }
      />
    </>
  );
};

export default DestinationCoursePage;
