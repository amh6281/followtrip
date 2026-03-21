import Link from 'next/link';
import Script from 'next/script';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdSlot, BackLink } from '@/components/common';
import { buildBreadcrumbListJsonLd, buildLandingMetadata } from '@/utils/seo';
import {
  courseById,
  destinationById,
  getRelatedLandings,
  landingList,
  findLandingByRegionAndSlug,
  placeById,
} from '@/utils/selectors';
import type {
  Companion,
  LandingPage,
  Mobility,
  Theme,
  WeatherFit,
} from '@/types/travel';

interface TripLandingPageProps {
  params: Promise<{ regionId: string; landingSlug: string }>;
}

const decodeRouteParam = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const companionLabels: Record<Companion, string> = {
  solo: '혼자',
  couple: '커플',
  friends: '친구와',
  parents: '부모님과',
  kids: '아이와',
  family: '가족과',
};

const themeLabels: Record<Theme, string> = {
  food: '먹거리',
  cafe: '카페',
  culture: '문화',
  history: '역사',
  nature: '자연',
  ocean: '바다',
  city: '도시',
  shopping: '쇼핑',
  healing: '힐링',
  'night-view': '야경',
  drive: '드라이브',
  family: '가족',
};

const mobilityLabels: Record<Mobility, string> = {
  walk: '도보',
  transit: '대중교통',
  taxi: '택시',
  car: '자차',
  mixed: '혼합 이동',
};

const weatherLabels: Record<WeatherFit, string> = {
  sunny: '맑은 날',
  cloudy: '흐린 날',
  rainy: '비 오는 날',
  snowy: '눈 오는 날',
  'rain-friendly': '우천 대응',
  indoor: '실내',
  outdoor: '야외',
  all: '날씨 무관',
};

const buildIntentPills = (landing: LandingPage) => {
  const pills: string[] = [];

  if (landing.intent.days) {
    pills.push(`${landing.intent.days}일`);
  }

  if (landing.intent.nights !== undefined) {
    pills.push(`${landing.intent.nights}박`);
  }

  for (const companion of landing.intent.companions ?? []) {
    pills.push(companionLabels[companion]);
  }

  for (const theme of landing.intent.themes ?? []) {
    pills.push(themeLabels[theme]);
  }

  for (const mobility of landing.intent.mobility ?? []) {
    pills.push(mobilityLabels[mobility]);
  }

  for (const weather of landing.intent.weatherFit ?? []) {
    pills.push(weatherLabels[weather]);
  }

  return pills;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return landingList
    .filter((landing) => landing.indexable)
    .map((landing) => ({
      regionId: landing.regionId,
      landingSlug: landing.slug,
    }));
}

export async function generateMetadata({
  params,
}: TripLandingPageProps): Promise<Metadata> {
  const { regionId, landingSlug } = await params;
  const decodedRegionId = decodeRouteParam(regionId);
  const decodedLandingSlug = decodeRouteParam(landingSlug);
  const destination = destinationById(decodedRegionId);
  const landing = findLandingByRegionAndSlug(
    decodedRegionId,
    decodedLandingSlug,
  );

  if (!destination || !landing) {
    return {};
  }

  return buildLandingMetadata({
    landing,
    destination,
    path: `/trips/${decodedRegionId}/${landing.slug}`,
  });
}

const TripLandingPage = async ({ params }: TripLandingPageProps) => {
  const { regionId, landingSlug } = await params;
  const decodedRegionId = decodeRouteParam(regionId);
  const decodedLandingSlug = decodeRouteParam(landingSlug);
  const destination = destinationById(decodedRegionId);
  const landing = findLandingByRegionAndSlug(
    decodedRegionId,
    decodedLandingSlug,
  );

  if (!destination || !landing) {
    notFound();
  }

  const featuredPlaces = landing.featuredPlaceIds
    .map((placeId) => placeById(placeId))
    .filter((place): place is NonNullable<typeof place> => place !== null);
  const featuredCourses = landing.courseIds
    .map((courseId) => courseById(courseId))
    .filter((course): course is NonNullable<typeof course> => course !== null);
  const relatedLandings = getRelatedLandings(landing).filter(
    (related) => related.indexable,
  );
  const intentPills = buildIntentPills(landing);
  const breadcrumbJsonLd = buildBreadcrumbListJsonLd([
    { name: '홈', path: '/' },
    { name: '여행', path: '/trips' },
    { name: destination.name, path: `/destinations/${destination.slug}` },
    {
      name: landing.heroTitle,
      path: `/trips/${destination.slug}/${landing.slug}`,
    },
  ]);

  return (
    <main className='min-h-[60vh]'>
      <Script
        id={`landing-breadcrumb-${landing.id}`}
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <div className='mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:px-6 md:py-14'>
        <BackLink href={`/destinations/${destination.slug}`}>
          {destination.name} 가이드로 돌아가기
        </BackLink>

        <section className='relative overflow-hidden rounded-3xl border border-black/5 bg-white px-6 py-8 shadow-sm md:px-8 md:py-10'>
          <div className='bg-sunset/15 absolute -top-24 -right-16 h-56 w-56 rounded-full blur-3xl' />
          <div className='bg-accent/20 absolute -bottom-20 -left-10 h-48 w-48 rounded-full blur-3xl' />

          <div className='relative flex flex-col gap-5'>
            <div className='space-y-3'>
              <p className='text-primary text-sm font-semibold tracking-wide uppercase'>
                Search Intent Guide
              </p>
              <h1 className='text-3xl font-semibold tracking-tight md:text-4xl'>
                {landing.heroTitle}
              </h1>
              <p className='max-w-3xl text-sm leading-7 md:text-base'>
                {landing.heroDescription}
              </p>
            </div>

            {intentPills.length > 0 ? (
              <div className='flex flex-wrap gap-2'>
                {intentPills.map((pill) => (
                  <span
                    key={pill}
                    className='bg-primary/8 text-primary rounded-full px-3 py-1 text-xs font-medium'
                  >
                    {pill}
                  </span>
                ))}
              </div>
            ) : null}

            {landing.intro ? (
              <div className='border-border bg-background max-w-3xl rounded-2xl border p-4 text-sm leading-7'>
                {landing.intro}
              </div>
            ) : null}
          </div>
        </section>

        <AdSlot
          label='광고 슬롯 - 랜딩 상단'
          className='from-muted/40 to-muted/10 bg-linear-to-r'
        />

        <section className='grid gap-5 lg:grid-cols-[0.9fr_1.1fr]'>
          <div className='border-border bg-background rounded-2xl border p-5 md:p-6'>
            <h2 className='text-xl font-semibold'>이 페이지가 답하려는 것</h2>
            <ul className='mt-4 space-y-3 text-sm leading-6'>
              {(landing.highlights?.length
                ? landing.highlights
                : destination.itinerarySeeds
              ).map((item) => (
                <li
                  key={item}
                  className='border-border border-b pb-3 last:border-0 last:pb-0'
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className='border-border bg-background rounded-2xl border p-5 md:p-6'>
            <h2 className='text-xl font-semibold'>실용 정보</h2>
            <div className='mt-5 grid gap-4 md:grid-cols-2'>
              <div>
                <p className='text-muted-foreground text-sm'>추천 일정</p>
                <p className='mt-2 text-sm font-medium'>
                  {landing.intent.nights !== undefined
                    ? `${landing.intent.nights}박 ${landing.intent.days ?? ''}일`.trim()
                    : landing.intent.days
                      ? `${landing.intent.days}일`
                      : destination.tripLengths.join(' · ')}
                </p>
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>추천 이동 방식</p>
                <p className='mt-2 text-sm font-medium'>
                  {landing.intent.mobility?.length
                    ? landing.intent.mobility
                        .map((mobility) => mobilityLabels[mobility])
                        .join(' · ')
                    : '상황에 맞게 선택'}
                </p>
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>동반자 추천</p>
                <p className='mt-2 text-sm font-medium'>
                  {landing.intent.companions?.length
                    ? landing.intent.companions
                        .map((companion) => companionLabels[companion])
                        .join(' · ')
                    : destination.withWho
                        .map((companion) => companionLabels[companion])
                        .join(' · ')}
                </p>
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>비 오는 날 대안</p>
                <p className='mt-2 text-sm font-medium'>
                  {destination.rainyOptions[0] ??
                    '현지 상황에 맞춰 실내 대안을 확인하세요.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className='space-y-4'>
          <div>
            <h2 className='text-xl font-semibold'>추천 코스</h2>
            <p className='text-muted-foreground mt-1 text-sm'>
              검색 의도와 가장 잘 맞는 코스를 먼저 확인할 수 있습니다.
            </p>
          </div>

          <div className='grid gap-4 lg:grid-cols-2'>
            {featuredCourses.length > 0 ? (
              featuredCourses.map((course) => (
                <Link
                  key={course.id}
                  href={`/destinations/${destination.slug}/courses/${course.slug}`}
                  className='border-border bg-background hover:border-primary/40 rounded-2xl border p-5 transition-colors'
                >
                  <p className='text-base font-semibold'>{course.title}</p>
                  <p className='text-muted-foreground mt-2 text-sm'>
                    {course.summary}
                  </p>
                </Link>
              ))
            ) : (
              <div className='border-border bg-background rounded-2xl border p-5 text-sm leading-6'>
                아직 이 검색 의도에 맞춰 연결한 대표 코스는 없지만, 아래 추천
                장소와 목적지 가이드를 조합해서 일정을 짜기 좋습니다.
              </div>
            )}
          </div>
        </section>

        <section className='space-y-4'>
          <div>
            <h2 className='text-xl font-semibold'>추천 장소</h2>
            <p className='text-muted-foreground mt-1 text-sm'>
              이 랜딩 의도와 가장 잘 맞는 장소만 골라 보여줍니다.
            </p>
          </div>

          <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
            {featuredPlaces.map((place) => (
              <Link
                key={place.id}
                href={`/destinations/${destination.slug}/places/${place.slug}`}
                className='border-border bg-background hover:border-primary/40 rounded-2xl border p-4 transition-colors'
              >
                <p className='text-base font-semibold'>{place.name}</p>
                <p className='text-muted-foreground mt-2 text-sm'>
                  {place.address}
                </p>
                <p className='text-muted-foreground mt-3 text-xs'>
                  {place.bestVisitText ?? place.bestTimeSlots.join(', ')}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className='space-y-4'>
          <div className='flex items-center justify-between gap-3'>
            <div>
              <h2 className='text-xl font-semibold'>비슷한 검색 의도</h2>
              <p className='text-muted-foreground mt-1 text-sm'>
                같은 목적지 안에서 함께 많이 찾는 랜딩입니다.
              </p>
            </div>
          </div>

          <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
            {relatedLandings.map((relatedLanding) => (
              <Link
                key={relatedLanding.id}
                href={`/trips/${destination.slug}/${relatedLanding.slug}`}
                className='border-border bg-background hover:border-primary/40 rounded-2xl border p-5 transition-colors'
              >
                <p className='text-base font-semibold'>
                  {relatedLanding.heroTitle}
                </p>
                <p className='text-muted-foreground mt-2 text-sm leading-6'>
                  {relatedLanding.heroDescription}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <AdSlot
          label='광고 슬롯 - 랜딩 하단'
          className='from-muted/20 to-background bg-linear-to-r'
        />
      </div>
    </main>
  );
};

export default TripLandingPage;
