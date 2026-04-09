import { BackLink } from '@/components/common';
import type { Destination } from '@/types/travel';

interface RegionHeaderSectionProps {
  region: Destination;
}

const RegionHeaderSection = ({ region }: RegionHeaderSectionProps) => {
  return (
    <section className='space-y-4'>
      <BackLink href='/'>홈으로 돌아가기</BackLink>
      <div className='space-y-2'>
        <h1 className='text-foreground text-3xl font-bold tracking-tight md:text-4xl'>
          {region.name} 여행 가이드
        </h1>
        <p className='text-muted-foreground text-sm'>{region.heroSummary}</p>
        <p className='text-muted-foreground text-sm'>
          {region.updatedAt} 업데이트
        </p>
      </div>
    </section>
  );
};

export default RegionHeaderSection;
