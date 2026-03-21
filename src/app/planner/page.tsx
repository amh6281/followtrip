import Link from 'next/link';
import type { Metadata } from 'next';
import { AdSlot, BackLink } from '@/components/common';
import { buildPageMetadata } from '@/utils/seo';
import {
  destinationById,
  destinationList,
  findLandings,
  getCoursesByRegionId,
} from '@/utils/selectors';
import type {
  BudgetLevel,
  Companion,
  CourseTemplate,
  Mobility,
  Theme,
  TripLengthLabel,
  WeatherFit,
} from '@/types/travel';

interface PlannerPageProps {
  searchParams: Promise<{
    dest?: string | string[];
    days?: string | string[];
    nights?: string | string[];
    companion?: string | string[];
    mobility?: string | string[];
    style?: string | string[];
  }>;
}

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

const companionLabels: Record<Companion, string> = {
  solo: '혼자',
  couple: '커플',
  friends: '친구와',
  parents: '부모님과',
  kids: '아이와',
  family: '가족과',
};

const mobilityLabels: Record<Mobility, string> = {
  walk: '도보',
  transit: '대중교통',
  taxi: '택시',
  car: '자차',
  mixed: '혼합',
};

const budgetLevelLabels: Record<BudgetLevel, string> = {
  low: '가벼운 예산',
  mid: '중간 예산',
  high: '여유 예산',
};

const tripLengthByDays = (
  days?: number,
  nights?: number,
): TripLengthLabel | null => {
  if (nights === 0 && days === 1) return '당일';
  if (nights === 1 && days === 2) return '1박2일';
  if (nights === 2 && days === 3) return '2박3일';
  return null;
};

const getFirstValue = (value?: string | string[]) =>
  Array.isArray(value) ? value[0] : value;

const decodeRouteParam = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const parseNumber = (value?: string | string[]) => {
  const raw = getFirstValue(value);
  if (!raw) return undefined;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const parseCompanion = (value?: string | string[]): Companion | undefined => {
  const raw = getFirstValue(value);
  if (!raw) return undefined;
  const decoded = decodeRouteParam(raw) as Companion;
  return ['solo', 'couple', 'friends', 'parents', 'kids', 'family'].includes(
    decoded,
  )
    ? decoded
    : undefined;
};

const parseMobility = (value?: string | string[]): Mobility | undefined => {
  const raw = getFirstValue(value);
  if (!raw) return undefined;
  const decoded = decodeRouteParam(raw) as Mobility;
  return ['walk', 'transit', 'taxi', 'car', 'mixed'].includes(decoded)
    ? decoded
    : undefined;
};

const parseTheme = (value?: string | string[]): Theme | undefined => {
  const raw = getFirstValue(value);
  if (!raw) return undefined;
  const decoded = decodeRouteParam(raw) as Theme;
  return [
    'food',
    'cafe',
    'culture',
    'history',
    'nature',
    'ocean',
    'city',
    'shopping',
    'healing',
    'night-view',
    'drive',
    'family',
  ].includes(decoded)
    ? decoded
    : undefined;
};

const formatTravelTime = (hours?: number) => {
  if (hours === undefined) return null;
  return Number.isInteger(hours) ? `${hours}시간` : `${hours}시간`;
};

const estimateBudgetText = (
  budgetLevel: BudgetLevel,
  days?: number,
  companion?: Companion,
) => {
  const basePerDay =
    budgetLevel === 'low' ? 70000 : budgetLevel === 'mid' ? 120000 : 190000;
  const travelDays = Math.max(days ?? 1, 1);
  const companionMultiplier =
    companion === 'family' || companion === 'kids'
      ? 2.6
      : companion === 'parents'
        ? 2.2
        : companion === 'couple' || companion === 'friends'
          ? 2
          : 1;
  const min = Math.round(basePerDay * travelDays * companionMultiplier * 0.85);
  const max = Math.round(basePerDay * travelDays * companionMultiplier * 1.25);

  return `${min.toLocaleString('ko-KR')}원 ~ ${max.toLocaleString('ko-KR')}원`;
};

const buildPackingChecklist = ({
  days,
  mobility,
  style,
}: {
  days?: number;
  mobility?: Mobility;
  style?: Theme;
}) => {
  const checklist = ['충전기', '보조배터리', '신분증', '결제 수단'];

  if ((days ?? 1) >= 2) {
    checklist.push('여벌 옷', '세면도구');
  }

  if (mobility === 'walk' || mobility === 'transit') {
    checklist.push('편한 운동화');
  }

  if (style === 'ocean' || style === 'nature') {
    checklist.push('얇은 겉옷', '선크림');
  }

  if (style === 'cafe' || style === 'shopping') {
    checklist.push('가벼운 텀블러 또는 물병');
  }

  return checklist;
};

const sortCourses = (
  courses: CourseTemplate[],
  {
    days,
    nights,
    companion,
    mobility,
    style,
  }: {
    days?: number;
    nights?: number;
    companion?: Companion;
    mobility?: Mobility;
    style?: Theme;
  },
) =>
  [...courses]
    .map((course) => {
      let score = 0;

      if (days !== undefined && course.tripLength.days === days) score += 3;
      if (nights !== undefined && course.tripLength.nights === nights)
        score += 2;
      if (companion && course.companions.includes(companion)) score += 2;
      if (mobility && course.mobility === mobility) score += 2;
      if (style && course.themes.includes(style)) score += 2;

      return { course, score };
    })
    .sort((a, b) => b.score - a.score)
    .map(({ course }) => course);

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: '여행 플래너',
    description:
      '목적지, 일정, 동반자, 이동 방식에 맞춰 예산과 추천 동선, 준비 체크리스트를 빠르게 확인하세요.',
    path: '/planner',
    noindex: true,
  });
}

const PlannerPage = async ({ searchParams }: PlannerPageProps) => {
  const params = await searchParams;
  const rawDest = getFirstValue(params.dest);
  const dest = rawDest ? decodeRouteParam(rawDest) : undefined;
  const days = parseNumber(params.days);
  const nights = parseNumber(params.nights);
  const companion = parseCompanion(params.companion);
  const mobility = parseMobility(params.mobility);
  const style = parseTheme(params.style);

  const selectedDestination = dest ? destinationById(dest) : null;
  const suggestedDestination =
    selectedDestination ??
    destinationList.find((destination) => {
      const tripLength = tripLengthByDays(days, nights);

      if (tripLength && !destination.tripLengths.includes(tripLength)) {
        return false;
      }

      if (companion && !destination.withWho.includes(companion)) {
        return false;
      }

      if (style && !destination.themes.includes(style)) {
        return false;
      }

      return true;
    }) ??
    destinationList[0];

  const selectedCourses = sortCourses(
    getCoursesByRegionId(suggestedDestination.slug),
    {
      days,
      nights,
      companion,
      mobility,
      style,
    },
  ).slice(0, 3);

  const landingMatches = findLandings(
    {
      days,
      nights,
      companions: companion ? [companion] : undefined,
      mobility: mobility ? [mobility] : undefined,
      themes: style ? [style] : undefined,
      weatherFit:
        style === 'cafe' || style === 'culture'
          ? (['rain-friendly'] as WeatherFit[])
          : undefined,
    },
    suggestedDestination.slug,
  )
    .filter((landing) => landing.indexable)
    .slice(0, 3);

  const estimatedBudget = estimateBudgetText(
    suggestedDestination.budgetLevel,
    days,
    companion,
  );
  const packingChecklist = buildPackingChecklist({ days, mobility, style });
  const travelTimes = [
    ['자차', formatTravelTime(suggestedDestination.fromSeoul.carHours)],
    ['KTX', formatTravelTime(suggestedDestination.fromSeoul.ktxHours)],
    ['버스', formatTravelTime(suggestedDestination.fromSeoul.busHours)],
  ].filter((item): item is [string, string] => item[1] !== null);

  return (
    <main className='min-h-[60vh]'>
      <div className='mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:px-6 md:py-14'>
        <BackLink href='/'>홈으로</BackLink>

        <section className='relative overflow-hidden rounded-3xl border border-black/5 bg-white px-6 py-8 shadow-sm md:px-8 md:py-10'>
          <div className='bg-sunset/15 absolute -top-24 -right-16 h-56 w-56 rounded-full blur-3xl' />
          <div className='bg-accent/20 absolute -bottom-20 -left-10 h-48 w-48 rounded-full blur-3xl' />

          <div className='relative flex flex-col gap-5'>
            <div className='space-y-3'>
              <p className='text-primary text-sm font-semibold tracking-wide uppercase'>
                Travel Planner
              </p>
              <h1 className='text-3xl font-semibold tracking-tight md:text-4xl'>
                조건에 맞는 여행 플랜 추천
              </h1>
              <p className='max-w-3xl text-sm leading-7 md:text-base'>
                목적지, 일정, 동반자, 이동 방식을 바탕으로 예산과 이동 시간,
                추천 코스, 짐 체크리스트를 한 번에 정리합니다.
              </p>
            </div>

            <div className='flex flex-wrap gap-2'>
              <span className='bg-primary/8 text-primary rounded-full px-3 py-1 text-xs font-medium'>
                목적지 {selectedDestination?.name ?? suggestedDestination.name}
              </span>
              {days ? (
                <span className='bg-primary/8 text-primary rounded-full px-3 py-1 text-xs font-medium'>
                  {days}일
                </span>
              ) : null}
              {nights !== undefined ? (
                <span className='bg-primary/8 text-primary rounded-full px-3 py-1 text-xs font-medium'>
                  {nights}박
                </span>
              ) : null}
              {companion ? (
                <span className='bg-primary/8 text-primary rounded-full px-3 py-1 text-xs font-medium'>
                  {companionLabels[companion]}
                </span>
              ) : null}
              {mobility ? (
                <span className='bg-primary/8 text-primary rounded-full px-3 py-1 text-xs font-medium'>
                  {mobilityLabels[mobility]}
                </span>
              ) : null}
              {style ? (
                <span className='bg-primary/8 text-primary rounded-full px-3 py-1 text-xs font-medium'>
                  {themeLabels[style]}
                </span>
              ) : null}
            </div>
          </div>
        </section>

        <AdSlot
          label='광고 슬롯 - 플래너 상단'
          className='from-muted/40 to-muted/10 bg-linear-to-r'
        />

        <section className='grid gap-5 lg:grid-cols-[0.95fr_1.05fr]'>
          <div className='border-border bg-background rounded-2xl border p-5 md:p-6'>
            <h2 className='text-xl font-semibold'>추천 목적지</h2>
            <p className='text-muted-foreground mt-2 text-sm leading-6'>
              {selectedDestination
                ? `선택한 조건을 기준으로 ${selectedDestination.name} 플랜을 정리했습니다.`
                : `입력 조건을 바탕으로 ${suggestedDestination.name}이 가장 잘 맞는 목적지로 추천됐습니다.`}
            </p>
            <div className='mt-5 space-y-3 text-sm'>
              <div>
                <p className='text-muted-foreground'>추천 이유</p>
                <p className='mt-1 font-medium'>
                  {suggestedDestination.heroSummary}
                </p>
              </div>
              <div>
                <p className='text-muted-foreground'>예산 감도</p>
                <p className='mt-1 font-medium'>
                  {budgetLevelLabels[suggestedDestination.budgetLevel]}
                </p>
              </div>
              <div>
                <p className='text-muted-foreground'>추천 일정 길이</p>
                <p className='mt-1 font-medium'>
                  {suggestedDestination.tripLengths.join(' · ')}
                </p>
              </div>
            </div>
          </div>

          <div className='border-border bg-background rounded-2xl border p-5 md:p-6'>
            <h2 className='text-xl font-semibold'>예산과 이동 시간</h2>
            <div className='mt-5 grid gap-4 md:grid-cols-2'>
              <div className='rounded-2xl bg-black/5 p-4'>
                <p className='text-muted-foreground text-sm'>예상 총 예산</p>
                <p className='mt-2 text-lg font-semibold'>{estimatedBudget}</p>
              </div>
              <div className='rounded-2xl bg-black/5 p-4'>
                <p className='text-muted-foreground text-sm'>서울 출발 이동</p>
                <p className='mt-2 text-sm font-medium'>
                  {travelTimes.length > 0
                    ? travelTimes
                        .map(([label, value]) => `${label} ${value}`)
                        .join(' · ')
                    : '별도 이동 수단 확인 필요'}
                </p>
              </div>
            </div>
            <ul className='mt-4 space-y-2 text-sm leading-6'>
              <li>
                예산은 목적지 예산 레벨과 일정 길이를 기준으로 추정했습니다.
              </li>
              <li>
                숙소 등급과 현지 이동 방식에 따라 실제 비용은 달라질 수
                있습니다.
              </li>
            </ul>
          </div>
        </section>

        <section className='grid gap-5 lg:grid-cols-2'>
          <div className='border-border bg-background rounded-2xl border p-5 md:p-6'>
            <div className='flex items-center justify-between gap-3'>
              <h2 className='text-xl font-semibold'>추천 동선</h2>
              <Link
                href={`/destinations/${suggestedDestination.slug}`}
                className='text-primary text-sm font-medium'
              >
                목적지 가이드 보기
              </Link>
            </div>
            <ol className='mt-4 space-y-3 text-sm leading-6'>
              {suggestedDestination.itinerarySeeds.map((seed, index) => (
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
            <h2 className='text-xl font-semibold'>짐 체크리스트</h2>
            <ul className='mt-4 space-y-3 text-sm leading-6'>
              {packingChecklist.map((item) => (
                <li key={item} className='rounded-xl bg-black/5 px-4 py-3'>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className='space-y-4'>
          <div>
            <h2 className='text-xl font-semibold'>조건에 맞는 추천 코스</h2>
            <p className='text-muted-foreground mt-1 text-sm'>
              일정 길이, 동반자, 이동 방식, 스타일을 기준으로 우선순위를
              정했습니다.
            </p>
          </div>

          <div className='grid gap-4 lg:grid-cols-3'>
            {selectedCourses.length > 0 ? (
              selectedCourses.map((course) => (
                <Link
                  key={course.id}
                  href={`/destinations/${suggestedDestination.slug}/courses/${course.slug}`}
                  className='border-border bg-background hover:border-primary/40 rounded-2xl border p-5 transition-colors'
                >
                  <p className='text-base font-semibold'>{course.title}</p>
                  <p className='text-muted-foreground mt-2 text-sm'>
                    {course.summary}
                  </p>
                  <p className='text-muted-foreground mt-3 text-xs'>
                    {course.budget.text ?? '예산 정보 준비 중'} ·{' '}
                    {mobilityLabels[course.mobility]}
                  </p>
                </Link>
              ))
            ) : (
              <div className='border-border bg-background rounded-2xl border p-5 text-sm leading-6 lg:col-span-3'>
                아직 조건과 정확히 일치하는 코스는 없지만, 목적지 가이드와 랜딩
                페이지를 함께 보면 충분히 일정을 구성할 수 있습니다.
              </div>
            )}
          </div>
        </section>

        <section className='space-y-4'>
          <div>
            <h2 className='text-xl font-semibold'>추천 랜딩 페이지</h2>
            <p className='text-muted-foreground mt-1 text-sm'>
              검색 의도에 가까운 랜딩을 함께 보면 일정 결정이 더 빨라집니다.
            </p>
          </div>

          <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
            {landingMatches.length > 0 ? (
              landingMatches.map((landing) => (
                <Link
                  key={landing.id}
                  href={`/trips/${suggestedDestination.slug}/${landing.slug}`}
                  className='border-border bg-background hover:border-primary/40 rounded-2xl border p-5 transition-colors'
                >
                  <p className='text-base font-semibold'>{landing.heroTitle}</p>
                  <p className='text-muted-foreground mt-2 text-sm leading-6'>
                    {landing.heroDescription}
                  </p>
                </Link>
              ))
            ) : (
              <div className='border-border bg-background rounded-2xl border p-5 text-sm leading-6 md:col-span-2 xl:col-span-3'>
                현재 조건과 바로 맞는 랜딩은 없지만, {suggestedDestination.name}{' '}
                가이드와 추천 코스를 기준으로 일정 설계를 시작하기 좋습니다.
              </div>
            )}
          </div>
        </section>

        <section className='border-border bg-background rounded-2xl border p-5 md:p-6'>
          <h2 className='text-xl font-semibold'>비 오는 날 대안</h2>
          <ul className='mt-4 space-y-3 text-sm leading-6'>
            {suggestedDestination.rainyOptions.map((option) => (
              <li
                key={option}
                className='border-border border-b pb-3 last:border-0 last:pb-0'
              >
                {option}
              </li>
            ))}
          </ul>
        </section>

        <AdSlot
          label='광고 슬롯 - 플래너 하단'
          className='from-muted/20 to-background bg-linear-to-r'
        />
      </div>
    </main>
  );
};

export default PlannerPage;
