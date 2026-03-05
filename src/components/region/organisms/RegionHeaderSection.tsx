import { BackLink } from '@/components/common';
import type { Region } from '@/types/region';

interface RegionHeaderSectionProps {
  region: Region;
}

const RegionHeaderSection = ({ region }: RegionHeaderSectionProps) => {
  return (
    <section className='space-y-4'>
      <BackLink href='/'>홈으로 돌아가기</BackLink>
      <div className='space-y-2'>
        <h1 className='text-foreground text-3xl font-bold tracking-tight md:text-4xl'>
          {region.subtitle}
        </h1>
        <p className='text-muted-foreground text-sm'>
          {region.updatedAt} 업데이트
        </p>
      </div>
    </section>
  );
};

export default RegionHeaderSection;
