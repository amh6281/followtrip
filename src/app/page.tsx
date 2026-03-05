import type { Metadata } from 'next';
import HomeTemplate from '@/components/home/templates/HomeTemplate';

export const metadata: Metadata = {
  title: '팔로우트립 | 여행을 그대로 따라가다',
  description:
    '누군가의 여행 경로를 그대로 따라가는 가장 쉬운 방법, 팔로우트립',
};

const HomePage = () => {
  return <HomeTemplate />;
};

export default HomePage;
