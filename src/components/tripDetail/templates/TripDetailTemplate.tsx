import { BackLink } from '@/components/common';
import type { TripDetail } from '@/types/trip';
import SummaryCard from '../organisms/SummaryCard';
import Timeline from '../organisms/Timeline';
import ReviewSection from '../organisms/ReviewSection';

interface TripDetailTemplateProps {
  detail: TripDetail;
}

const TripDetailTemplate = ({ detail }: TripDetailTemplateProps) => {
  return (
    <div className='bg-background min-h-full flex-1'>
      <main className='container mx-auto max-w-3xl px-4 py-10 max-md:py-6'>
        <BackLink />

        {/* 요약 카드 */}
        <section className='mb-16 max-md:mb-14'>
          <SummaryCard trip={detail} />
        </section>

        {/* 일정 */}
        <Timeline steps={detail.steps} />

        {/* 후기 */}
        <ReviewSection review={detail.review} />
      </main>
    </div>
  );
};

export default TripDetailTemplate;
