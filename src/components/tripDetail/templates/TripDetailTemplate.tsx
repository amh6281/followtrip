import Link from 'next/link';
import { ArrowLeftIcon, ListChecksIcon } from '@phosphor-icons/react/dist/ssr';
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
        <Link
          href='/'
          className='text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2 py-2 pr-2 text-sm font-medium transition-colors'
        >
          <ArrowLeftIcon size={20} weight='bold' />
          목록으로
        </Link>

        {/* 요약 카드 */}
        <section className='mb-16 max-md:mb-14'>
          <SummaryCard trip={detail} />
        </section>

        {/* 일정 */}
        <section className='mb-16 max-md:mb-14'>
          <h2 className='text-foreground mb-6 flex items-center gap-3 text-2xl font-semibold tracking-tight max-md:text-xl'>
            <span className='bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl'>
              <ListChecksIcon size={20} weight='duotone' />
            </span>
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
