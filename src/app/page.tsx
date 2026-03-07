import type { Metadata } from 'next';
import HomeTemplate from '@/components/home/templates/HomeTemplate';
import { buildPageMetadata, SITE_DESCRIPTION, SITE_TITLE } from '@/lib/seo';

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    path: '/',
  }),
};

const HomePage = () => {
  return <HomeTemplate />;
};

export default HomePage;
