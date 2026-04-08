import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import {
  courseList,
  destinationList,
  getFeaturedCoursesByRegionId,
  getLandingsByRegionId,
  getPlacesByRegionId,
} from '@/utils/selectors';

type RevalidateRequestBody = {
  secret?: string;
  path?: string;
  paths?: string[];
  regionId?: string;
  regionIds?: string[];
  revalidateAll?: boolean;
};

// revalidatePath를 안정적으로 사용하기 위해 Node.js 런타임으로 고정
export const runtime = 'nodejs';

// 재검증 path 배열에서 중복과 빈 값을 제거
const getUniquePaths = (paths: Iterable<string>): string[] =>
  [...new Set(paths)].filter(Boolean);

// 한글 slug 등 인코딩된 값을 안전하게 원래 문자열로 복원
const decodeValue = (value: string): string => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

// 단일 regionId와 배열 regionIds를 하나의 정규화된 배열로 합치기
const normalizeRegionIds = (body: RevalidateRequestBody): string[] => {
  const values = [
    ...(body.regionId ? [body.regionId] : []),
    ...(body.regionIds ?? []),
  ];

  return [...new Set(values.map((value) => decodeValue(value).trim()))].filter(
    Boolean,
  );
};

// 특정 지역에 연결된 목적지/장소/코스/랜딩 경로를 한 번에 수집
const buildRegionPaths = (regionId: string): string[] => {
  const paths = [`/destinations/${regionId}`, `/${regionId}`];
  const places = getPlacesByRegionId(regionId);
  const landings = getLandingsByRegionId(regionId).filter(
    (landing) => landing.indexable,
  );
  const courses = courseList.filter((course) => course.regionId === regionId);
  const featuredCourses = getFeaturedCoursesByRegionId(regionId);

  for (const place of places) {
    paths.push(
      `/destinations/${regionId}/places/${place.id}`,
      `/${regionId}/place/${place.id}`,
    );
  }

  for (const course of courses) {
    paths.push(`/destinations/${regionId}/courses/${course.slug}`);
  }

  for (const course of featuredCourses) {
    paths.push(`/${regionId}/${course.slug}`);
  }

  for (const landing of landings) {
    paths.push(`/trips/${regionId}/${landing.slug}`);
  }

  return paths;
};

// 별도 입력이 없을 때 전체 콘텐츠를 재검증할 수 있도록 공개 경로 합치기
const buildAllContentPaths = (): string[] => [
  '/',
  '/planner',
  '/sitemap.xml',
  '/robots.txt',
  ...destinationList.flatMap((destination) =>
    buildRegionPaths(destination.slug),
  ),
];

// secret은 query, header, JSON body 어디로 들어와도 읽을 수 있게 처리
const getSecretFromRequest = async (
  request: NextRequest,
): Promise<{ body: RevalidateRequestBody; providedSecret?: string }> => {
  const urlSecret = request.nextUrl.searchParams.get('secret') ?? undefined;
  const headerSecret = request.headers.get('x-revalidate-secret') ?? undefined;

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return {
      body: {},
      providedSecret: headerSecret ?? urlSecret,
    };
  }

  try {
    const body = (await request.json()) as RevalidateRequestBody;

    return {
      body,
      providedSecret: body.secret ?? headerSecret ?? urlSecret,
    };
  } catch {
    return {
      body: {},
      providedSecret: headerSecret ?? urlSecret,
    };
  }
};

// on-demand revalidation 요청을 받아 인증 후 path 단위 캐시를 무효화
export async function POST(request: NextRequest) {
  const configuredSecret = process.env.REVALIDATE_SECRET;

  // 서버에 secret이 아예 설정되지 않은 경우 운영 설정 누락으로 간주
  if (!configuredSecret) {
    return NextResponse.json(
      {
        revalidated: false,
        message: 'REVALIDATE_SECRET 환경변수가 설정되지 않았습니다.',
      },
      { status: 500 },
    );
  }

  const { body, providedSecret } = await getSecretFromRequest(request);

  // 요청 secret이 일치하지 않으면 재검증을 허용 안함
  if (providedSecret !== configuredSecret) {
    return NextResponse.json(
      {
        revalidated: false,
        message: '인증에 실패했습니다.',
      },
      { status: 401 },
    );
  }

  const regionIds = normalizeRegionIds(body);
  const requestedPaths = getUniquePaths(
    [body.path, ...(body.paths ?? [])]
      .filter((value): value is string => Boolean(value))
      .map((value) => decodeValue(value).trim()),
  );

  const invalidRegionIds = regionIds.filter(
    (regionId) =>
      !destinationList.some((destination) => destination.slug === regionId),
  );

  // 존재하지 않는 지역 id가 들어오면 잘못된 요청으로 처리
  if (invalidRegionIds.length > 0) {
    return NextResponse.json(
      {
        revalidated: false,
        message: '존재하지 않는 regionId가 포함되어 있습니다.',
        invalidRegionIds,
      },
      { status: 400 },
    );
  }

  // 전체 재검증, 지역 단위 재검증, 개별 path 재검증 요청을 합쳐 최종 목록을 만들기
  const pathsToRevalidate = getUniquePaths([
    ...(body.revalidateAll ||
    (regionIds.length === 0 && requestedPaths.length === 0)
      ? buildAllContentPaths()
      : []),
    ...regionIds.flatMap((regionId) => buildRegionPaths(regionId)),
    ...requestedPaths,
  ]);

  // 최종적으로 아무 path도 남지 않으면 처리할 작업이 없으므로 400을 반환
  if (pathsToRevalidate.length === 0) {
    return NextResponse.json(
      {
        revalidated: false,
        message: '재검증할 path가 없습니다.',
      },
      { status: 400 },
    );
  }

  // 각 경로를 순회하며 Next.js 캐시를 무효화
  for (const path of pathsToRevalidate) {
    revalidatePath(path);
  }

  // 어떤 경로를 재검증했는지 응답으로 돌려주어 호출 측에서 확인
  return NextResponse.json({
    revalidated: true,
    count: pathsToRevalidate.length,
    paths: pathsToRevalidate,
    regionIds,
  });
}
