'use client';

import SummaryCard from '@/components/tripDetail/organisms/SummaryCard';
import Timeline from '@/components/tripDetail/organisms/Timeline';
import ReviewSection from '@/components/tripDetail/organisms/ReviewSection';

const MOCK_TRIP = {
  id: 'preview',
  title: '(제목 없음)',
  location: '-',
  duration: '-',
  travelType: '-',
  totalCost: 0,
  likes: 0,
  thumbnail:
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
  createdAt: new Date().toISOString().slice(0, 10),
};

const PreviewStep = () => {
  return (
    <div className='space-y-6'>
      <p className='text-muted-foreground text-sm'>
        아래처럼 공개됩니다. 수정하려면 이전 단계로 돌아가세요.
      </p>

      <SummaryCard trip={MOCK_TRIP} />

      <Timeline steps={[]} />

      <ReviewSection />

      <div className='border-border flex flex-col gap-4 border-t pt-8 sm:flex-row sm:justify-end'>
        <button
          type='button'
          className='bg-primary text-primary-foreground w-full rounded-xl px-6 py-3 text-[15px] font-semibold transition-opacity hover:opacity-90 sm:w-auto'
        >
          게시하기
        </button>
      </div>
    </div>
  );
};

export default PreviewStep;
