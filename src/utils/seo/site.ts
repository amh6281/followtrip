const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');
const ensureLeadingSlash = (value: string) =>
  value.startsWith('/') ? value : `/${value}`;

export const SITE_NAME = '팔로우트립';
export const SITE_TITLE = '팔로우트립 | 여행을 그대로 따라가다';
export const SITE_DESCRIPTION =
  '국내 여행 코스, 장소 정보, 예산 계산기를 한 곳에서 확인하는 팔로우트립';
export const DEFAULT_OG_IMAGE = '/og-image.png';
export const DEFAULT_OG_WIDTH = 1200;
export const DEFAULT_OG_HEIGHT = 630;
export const SITE_LOCALE = 'ko_KR';

export const siteUrl = (() => {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return value ? trimTrailingSlash(value) : null;
})();

export const absoluteUrl = (path = '/') => {
  if (!siteUrl) return null;
  if (path === '/') return siteUrl;
  return `${siteUrl}${ensureLeadingSlash(path)}`;
};

export const ensureAbsolutePath = (path = '/') => ensureLeadingSlash(path);
