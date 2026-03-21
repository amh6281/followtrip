import Link from 'next/link';
import Script from 'next/script';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdSlot, BackLink } from '@/components/common';
import {
  buildBreadcrumbListJsonLd,
  buildDestinationJsonLd,
  buildPageMetadata,
} from '@/utils/seo';
import {
  courseById,
  destinationList,
  getLandingsByRegionId,
  placeById,
} from '@/utils/selectors';

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

const themeLabels: Record<string, string> = {
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

const companionLabels: Record<string, string> = {
  solo: '혼자',
  couple: '커플',
  friends: '친구와',
  parents: '부모님과',
  kids: '아이와',
  family: '가족과',
};

const budgetLabels: Record<string, string> = {
  low: '가벼운 예산',
  mid: '중간 예산',
  high: '여유 예산',
};

const travelTimeLabels: Record<string, string> = {
  carHours: '자차',
  ktxHours: 'KTX',
  busHours: '버스',
};

const formatHours = (value: number) =>
  Number.isInteger(value) ? `${value}시간` : `${value}시간`;

export const dynamicParams = false;

export async function generateStaticParams() {
  return destinationList.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinationList.find((item) => item.slug === slug);

  if (!destination) {
    return {};
  }

  return buildPageMetadata({
    title: `${destination.name} 여행 가이드`,
    description: `${destination.heroSummary} 추천 일정 ${destination.tripLengths.join(', ')}, 서울 출발 이동 정보와 대표 동선을 한 번에 확인할 수 있습니다.`,
    path: `/destinations/${destination.slug}`,
  });
}

const DestinationPage = async ({ params }: DestinationPageProps) => {
  const { slug } = await params;
  const destination = destinationList.find((item) => item.slug === slug);

  if (!destination) {
    notFound();
  }

  const featuredPlaces = destination.featuredPlaceIds
    .map((placeId) => placeById(placeId))
    .filter((place): place is NonNullable<typeof place> => place !== null);
  const featuredCourses = destination.featuredCourseIds
    .map((courseId) => courseById(courseId))
    .filter((course): course is NonNullable<typeof course> => course !== null);
  const relatedLandings = getLandingsByRegionId(destination.slug).filter(
    (landing) => landing.indexable,
  );
  const travelTimes = Object.entries(destination.fromSeoul)
    .filter(
      (entry): entry is [keyof typeof destination.fromSeoul, number] =>
        typeof entry[1] === 'number',
    )
    .map(([key, value]) => `${travelTimeLabels[key]} 약 ${formatHours(value)}`);

  const breadcrumbJsonLd = buildBreadcrumbListJsonLd([
    { name: '홈', path: '/' },
    { name: '목적지', path: '/destinations' },
    { name: destination.name, path: `/destinations/${destination.slug}` },
  ]);
  const destinationJsonLd = buildDestinationJsonLd({
    destination,
    path: `/destinations/${destination.slug}`,
  });

  return (
    <main className='min-h-[60vh]'>
      <Script
        id={`destination-breadcrumb-${destination.slug}`}
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <Script
        id={`destination-jsonld-${destination.slug}`}
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(destinationJsonLd),
        }}
      />

      <div className='mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:px-6 md:py-14'>
        <BackLink href='/'>홈으로</BackLink>

        <section className='relative overflow-hidden rounded-3xl border border-black/5 bg-white px-6 py-8 shadow-sm md:px-8 md:py-10'>
          <div className='bg-sunset/15 absolute -top-24 -right-16 h-56 w-56 rounded-full blur-3xl' />
          <div className='bg-accent/20 absolute -bottom-20 -left-10 h-48 w-48 rounded-full blur-3xl' />

          <div className='relative flex flex-col gap-5'>
            <div className='space-y-3'>
              <p className='text-primary text-sm font-semibold tracking-wide uppercase'>
                Destination Guide
              </p>
              <div className='space-y-2'>
                <h1 className='text-3xl font-semibold tracking-tight md:text-4xl'>
                  {destination.name}
                </h1>
                <p className='text-muted-foreground text-sm md:text-base'>
                  {destination.area}
                </p>
              </div>
              <p className='max-w-3xl text-sm leading-7 md:text-base'>
                {destination.heroSummary}
              </p>
            </div>

            <div className='flex flex-wrap gap-2'>
              {destination.themes.map((theme) => (
                <span
                  key={theme}
                  className='bg-primary/8 text-primary rounded-full px-3 py-1 text-xs font-medium'
                >
                  {themeLabels[theme] ?? theme}
                </span>
              ))}
            </div>

            <div className='grid gap-4 md:grid-cols-3'>
              <div className='border-border bg-background rounded-2xl border p-4'>
                <p className='text-muted-foreground text-xs'>추천 일정 길이</p>
                <p className='mt-2 text-sm font-medium md:text-base'>
                  {destination.tripLengths.join(' · ')}
                </p>
              </div>
              <div className='border-border bg-background rounded-2xl border p-4'>
                <p className='text-muted-foreground text-xs'>적합한 동반자</p>
                <p className='mt-2 text-sm font-medium md:text-base'>
                  {destination.withWho
                    .map((companion) => companionLabels[companion] ?? companion)
                    .join(' · ')}
                </p>
              </div>
              <div className='border-border bg-background rounded-2xl border p-4'>
                <p className='text-muted-foreground text-xs'>예산 감도</p>
                <p className='mt-2 text-sm font-medium md:text-base'>
                  {budgetLabels[destination.budgetLevel]}
                </p>
              </div>
            </div>
          </div>
        </section>

        <AdSlot
          label='광고 슬롯 - 목적지 상단'
          className='from-muted/40 to-muted/10 bg-linear-to-r'
        />

        <section className='grid gap-5 lg:grid-cols-[1.2fr_0.8fr]'>
          <div className='border-border bg-background rounded-2xl border p-5 md:p-6'>
            <h2 className='text-xl font-semibold'>여행 준비 한눈에 보기</h2>
            <div className='mt-5 grid gap-5 md:grid-cols-2'>
              <div>
                <p className='text-muted-foreground text-sm'>추천 계절</p>
                <ul className='mt-3 space-y-2 text-sm'>
                  {destination.bestSeasons.map((season) => (
                    <li key={season}>{season}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>
                  서울 출발 이동 시간
                </p>
                <ul className='mt-3 space-y-2 text-sm'>
                  {travelTimes.length > 0 ? (
                    travelTimes.map((item) => <li key={item}>{item}</li>)
                  ) : (
                    <li>현지 또는 항공 이동 기준 별도 확인이 필요합니다.</li>
                  )}
                </ul>
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>대표 지역</p>
                <ul className='mt-3 flex flex-wrap gap-2 text-sm'>
                  {destination.neighborhoods.map((neighborhood) => (
                    <li
                      key={neighborhood}
                      className='rounded-full bg-black/5 px-3 py-1'
                    >
                      {neighborhood}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>대표 먹거리</p>
                <ul className='mt-3 flex flex-wrap gap-2 text-sm'>
                  {destination.foodKeywords.map((keyword) => (
                    <li
                      key={keyword}
                      className='rounded-full bg-black/5 px-3 py-1'
                    >
                      {keyword}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className='border-border bg-background rounded-2xl border p-5 md:p-6'>
            <h2 className='text-xl font-semibold'>비 오는 날 대안</h2>
            <ul className='mt-4 space-y-3 text-sm leading-6'>
              {destination.rainyOptions.map((option) => (
                <li
                  key={option}
                  className='border-border border-b pb-3 last:border-0 last:pb-0'
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className='grid gap-5 lg:grid-cols-2'>
          <div className='border-border bg-background rounded-2xl border p-5 md:p-6'>
            <div className='flex items-center justify-between gap-3'>
              <h2 className='text-xl font-semibold'>대표 동선 아이디어</h2>
              <span className='text-muted-foreground text-xs'>
                itinerary seeds
              </span>
            </div>
            <ol className='mt-4 space-y-3 text-sm leading-6'>
              {destination.itinerarySeeds.map((seed, index) => (
                <li key={seed} className='flex gap-3'>
                  <span className='text-primary font-semibold'>
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <span>{seed}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className='border-border bg-background rounded-2xl border p-5 md:p-6'>
            <div className='flex items-center justify-between gap-3'>
              <h2 className='text-xl font-semibold'>자주 찾는 질문 시드</h2>
              <span className='text-muted-foreground text-xs'>FAQ seeds</span>
            </div>
            <ul className='mt-4 space-y-3 text-sm leading-6'>
              {destination.faqSeeds.map((faq) => (
                <li key={faq} className='rounded-xl bg-black/5 px-4 py-3'>
                  {faq}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className='space-y-4'>
          <div className='flex items-center justify-between gap-3'>
            <div>
              <h2 className='text-xl font-semibold'>대표 장소</h2>
              <p className='text-muted-foreground mt-1 text-sm'>
                현재 운영 중인 장소 상세 페이지로 바로 이동할 수 있습니다.
              </p>
            </div>
          </div>

          <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
            {featuredPlaces.map((place) => (
              <Link
                key={place.id}
                href={`/${destination.slug}/place/${place.id}`}
                className='border-border bg-background hover:border-primary/40 group rounded-2xl border p-4 transition-colors'
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
          <div>
            <h2 className='text-xl font-semibold'>대표 코스</h2>
            <p className='text-muted-foreground mt-1 text-sm'>
              코스 상세 라우트는 다음 단계에서 `destinations/[slug]/courses`
              구조로 옮길 예정이라, 지금은 허브에서 핵심 정보만 먼저 보여줍니다.
            </p>
          </div>

          <div className='grid gap-4 lg:grid-cols-2'>
            {featuredCourses.map((course) => (
              <article
                key={course.id}
                className='border-border bg-background rounded-2xl border p-5'
              >
                <p className='text-base font-semibold'>{course.title}</p>
                <p className='text-muted-foreground mt-2 text-sm'>
                  {course.summary}
                </p>
                <div className='text-muted-foreground mt-4 flex flex-wrap gap-2 text-xs'>
                  <span className='rounded-full bg-black/5 px-3 py-1'>
                    {course.tripLength.days}일 {course.tripLength.nights}박
                  </span>
                  <span className='rounded-full bg-black/5 px-3 py-1'>
                    {course.budget.text ?? '예산 정보 준비 중'}
                  </span>
                  <span className='rounded-full bg-black/5 px-3 py-1'>
                    {course.mobility}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className='space-y-4'>
          <div>
            <h2 className='text-xl font-semibold'>관련 랜딩 페이지</h2>
            <p className='text-muted-foreground mt-1 text-sm'>
              검색 의도형 랜딩은 다음 단계에서 `/trips/[regionId]/[landingSlug]`
              라우트로 연결됩니다.
            </p>
          </div>

          <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
            {relatedLandings.map((landing) => (
              <article
                key={landing.id}
                className='border-border bg-background rounded-2xl border p-5'
              >
                <div className='flex items-center justify-between gap-3'>
                  <p className='text-base font-semibold'>{landing.heroTitle}</p>
                  <span className='text-primary bg-primary/10 rounded-full px-2.5 py-1 text-[11px] font-medium'>
                    준비 중
                  </span>
                </div>
                <p className='text-muted-foreground mt-2 text-sm leading-6'>
                  {landing.heroDescription}
                </p>
              </article>
            ))}
          </div>
        </section>

        <AdSlot
          label='광고 슬롯 - 목적지 하단'
          className='from-muted/20 to-background bg-linear-to-r'
        />
      </div>
    </main>
  );
};

export default DestinationPage;
