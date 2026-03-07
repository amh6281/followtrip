import { Badge, SearchInput } from '../atoms';
import { RegionStatCard } from '../molecules';

interface HeroSectionProps {
  regionCount: number;
}

const HeroSection = ({ regionCount }: HeroSectionProps) => {
  return (
    <section className='border-border relative overflow-hidden border-b px-4 py-10 md:px-6 md:py-14'>
      <div className='bg-sunset/15 absolute -top-28 -right-20 h-64 w-64 rounded-full blur-3xl' />
      <div className='bg-accent/20 absolute -bottom-24 -left-16 h-56 w-56 rounded-full blur-3xl' />

      <div className='relative mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between'>
        <div className='max-w-2xl space-y-5'>
          <Badge text='Followtrip Curated' />
          <h1 className='text-foreground text-3xl leading-tight font-bold tracking-tight md:text-4xl'>
            팔로우트립 국내 여행 코스,
            <br className='hidden sm:block' />
            그대로 따라가면 완성됩니다.
          </h1>
          <p className='text-muted-foreground max-w-lg text-sm md:text-base'>
            실제 이동 동선을 기준으로 만든 코스와 장소 정보를 확인하고, 예산까지
            한 번에 계산해보세요.
          </p>
          {/* <SearchInput
            placeholder='지역, 테마, 기간 검색 (MVP 준비 중)'
            disabled
          /> */}
        </div>

        <RegionStatCard count={regionCount} />
      </div>
    </section>
  );
};

export default HeroSection;
