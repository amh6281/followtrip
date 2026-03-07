import type { Metadata } from 'next';

// URL 조합 시 슬래시 중복을 막기 위한 유틸
const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');
const ensureLeadingSlash = (value: string) =>
  value.startsWith('/') ? value : `/${value}`;

// 사이트 전역에서 재사용하는 SEO 기본값
export const SITE_NAME = '팔로우트립';
export const SITE_TITLE = '팔로우트립 | 여행을 그대로 따라가다';
export const SITE_DESCRIPTION =
  '국내 여행 코스, 장소 정보, 예산 계산기를 한 곳에서 확인하는 팔로우트립';
export const DEFAULT_OG_IMAGE = '/og-image.png';
export const DEFAULT_OG_WIDTH = 1200;
export const DEFAULT_OG_HEIGHT = 630;
export const SITE_LOCALE = 'ko_KR';

// 배포 도메인이 있으면 canonical, sitemap, OG 절대경로 생성
export const siteUrl = (() => {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return value ? trimTrailingSlash(value) : null;
})();

// 상대 경로를 사이트 기준 절대 URL로 변환하는 함수
export const absoluteUrl = (path = '/') => {
  if (!siteUrl) return null;
  if (path === '/') return siteUrl;
  return `${siteUrl}${ensureLeadingSlash(path)}`;
};

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
};

// 각 페이지에서 공통 형식의 metadata를 쉽게 만들기 위한 헬퍼
export const buildPageMetadata = ({
  title,
  description,
  path = '/',
}: MetadataInput): Metadata => {
  const canonical = absoluteUrl(path);
  const image = absoluteUrl(DEFAULT_OG_IMAGE);

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
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
