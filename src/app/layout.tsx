import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout';

export const metadata: Metadata = {
  title: '팔로우트립 | 여행을 그대로 따라가다',
  description:
    '누군가의 여행 경로를 그대로 따라가는 가장 쉬운 방법, 팔로우트립',
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
