import { ToolLinkCard } from '@/components/common';

const ToolsSection = () => {
  return (
    <section className='space-y-5'>
      <h2 className='text-foreground text-lg font-semibold md:text-xl'>
        여행 플래닝 도구
      </h2>
      <div className='w-full max-w-md'>
        <ToolLinkCard
          href='/tools/budget'
          title='여행 경비 계산기'
          description='인원·숙박·교통·식비 기준으로 예상 비용을 빠르게 계산하세요.'
        />
      </div>
    </section>
  );
};

export default ToolsSection;
