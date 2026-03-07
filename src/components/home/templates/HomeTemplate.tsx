import Script from 'next/script';
import { AdSlot } from '@/components/common';
import { regionList } from '@/constants/region';
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from '@/lib/seo';
import {
  HeroSection,
  CuratedCoursesSection,
  RegionCoursesSection,
  ToolsSection,
} from '../organisms';

const HomeTemplate = () => {
  // 사이트 대표 페이지 정보를 검색엔진에 전달하기 위한 WebSite 구조화 데이터
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: absoluteUrl('/') ?? undefined,
  };

  return (
    <main className='min-h-[60vh]'>
      {/* 검색엔진이 읽을 수 있도록 JSON-LD를 script 태그로 주입 */}
      <Script
        id='website-jsonld'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HeroSection regionCount={regionList.length} />

      <div className='mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14'>
        <div className='flex flex-col gap-12 lg:gap-16'>
          <AdSlot
            label='광고 슬롯 - 상단'
            className='from-muted/40 to-muted/10 bg-linear-to-r'
          />

          <CuratedCoursesSection />

          <RegionCoursesSection regionList={regionList} />

          <ToolsSection />

          <AdSlot
            label='광고 슬롯 - 하단'
            className='from-muted/20 to-background bg-linear-to-r'
          />
        </div>
      </div>
    </main>
  );
};

export default HomeTemplate;
