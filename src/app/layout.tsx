import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout';
import {
  buildPageMetadata,
  SITE_DESCRIPTION,
  SITE_TITLE,
  siteUrl,
} from '@/lib/seo';

const baseMetadata = buildPageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: '/',
});

export const metadata: Metadata = {
  // 사이트 절대 URL 기준 (canonical, OG 이미지 등 절대 경로 생성에 사용)
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,

  // 페이지 기본 제목 설정
  // 각 페이지에서 title을 지정하면 template이 적용됨 (예: "서울 여행 가이드 | 팔로우트립")
  title: {
    default: SITE_TITLE,
    template: '%s | 팔로우트립',
  },
  // 사이트 기본 설명 (검색 결과 및 SNS 미리보기 설명에 사용)
  description: SITE_DESCRIPTION,
  // canonical URL 설정 (중복 페이지 SEO 문제 방지)
  alternates: baseMetadata.alternates,
  // SNS 공유(Open Graph) 미리보기 정보 (카카오톡, 페이스북, 슬랙 등)
  openGraph: baseMetadata.openGraph,
  // Twitter(X) 공유 카드 정보
  twitter: baseMetadata.twitter,
  // 웹 애플리케이션 이름 (브라우저 / PWA / 검색엔진 참고 정보)
  applicationName: '팔로우트립',
  // 사이트 카테고리 (검색엔진이 사이트 주제를 이해하는 데 도움)
  category: 'travel',
  // 검색엔진 크롤링 및 색인 정책
  robots: {
    index: true, // 페이지 색인 허용
    follow: true, // 링크 따라가기 허용
    // Googlebot 전용 크롤링 정책
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large', // 큰 이미지 미리보기 허용
      'max-snippet': -1, // 검색 결과 텍스트 미리보기 제한 없음
      'max-video-preview': -1, // 영상 미리보기 제한 없음
    },
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='ko' suppressHydrationWarning>
      <head>
        <link
          rel='stylesheet'
          as='style'
          crossOrigin='anonymous'
          href='https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css'
        />
      </head>
      <body
        className='antialiased'
        style={{
          fontFamily:
            "'Spoqa Han Sans Neo', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
