import Link from 'next/link';
import { ListChecksIcon } from '@phosphor-icons/react/dist/ssr';
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
      <main className='container mx-auto max-w-3xl px-4 py-6 md:py-8'>
        <Link
          href='/'
          className='text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1 text-sm transition-colors'
        >
          ← 목록으로
        </Link>

        {/* 요약 카드 */}
        <section className='mb-10'>
          <SummaryCard trip={detail} />
        </section>

        {/* 일정 */}
        <section className='mb-10'>
          <h2 className='text-foreground mb-6 flex items-center gap-2 text-xl font-semibold'>
            <ListChecksIcon className='text-primary size-6' weight='duotone' />
            일정
          </h2>
          <Timeline steps={detail.steps} />
        </section>

        {/* 후기 */}
        <section>
          <ReviewSection review={detail.review} />
        </section>
      </main>
    </div>
  );
};

export default TripDetailTemplate;
