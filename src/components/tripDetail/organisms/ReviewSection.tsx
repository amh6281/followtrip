import {
  NotePencilIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  ArrowClockwiseIcon,
} from '@phosphor-icons/react/dist/ssr';
import type { TripReview } from '@/types/trip';

interface ReviewSectionProps {
  review?: TripReview;
}

const ReviewSection = ({ review }: ReviewSectionProps) => {
  if (!review) {
    return (
      <div className='border-border bg-muted/30 flex items-center justify-center rounded-2xl border border-dashed px-6 py-10'>
        <p className='text-muted-foreground text-sm'>작성된 후기가 없어요.</p>
      </div>
    );
  }

  return (
    <section className='border-border bg-background rounded-2xl border'>
      <div className='border-border border-b px-7 py-6 max-md:px-5 max-md:py-5'>
        <h2 className='text-foreground flex items-center gap-3 text-2xl font-semibold tracking-tight max-md:text-xl'>
          <span className='bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl'>
            <NotePencilIcon size={20} weight='fill' />
          </span>
          후기
        </h2>
      </div>

      <div className='p-7 max-md:p-5'>
        <div className='text-foreground mb-8 max-w-none text-[15px] leading-6 whitespace-pre-wrap max-md:leading-relaxed'>
          {review.fullText}
        </div>

        <div className='space-y-4'>
          <div className='border-success/30 bg-success/5 rounded-xl border-l-4 px-4 py-3'>
            <h3 className='text-foreground mb-2 flex items-center gap-2 text-sm font-semibold'>
              <ThumbsUpIcon className='text-success size-4' weight='fill' />
              추천 포인트
            </h3>
            <ul className='text-muted-foreground list-disc space-y-1.5 pl-6 text-sm'>
              {(review.recommendPoints ?? []).map((item, i) => (
                <li key={i} className='leading-relaxed'>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className='border-warning/40 bg-warning/5 rounded-xl border-l-4 px-4 py-3'>
            <h3 className='text-foreground mb-2 flex items-center gap-2 text-sm font-semibold'>
              <ThumbsDownIcon className='text-warning size-4' weight='fill' />
              비추천 포인트
            </h3>
            <ul className='text-muted-foreground list-disc space-y-1.5 pl-6 text-sm'>
              {(review.notRecommendPoints ?? []).map((item, i) => (
                <li key={i} className='leading-relaxed'>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className='border-accent/40 bg-accent/5 rounded-xl border-l-4 px-4 py-3'>
            <h3 className='text-foreground mb-2 flex items-center gap-2 text-sm font-semibold'>
              <ArrowClockwiseIcon
                className='text-accent size-4'
                weight='fill'
              />
              다음에 바꿀 점
            </h3>
            <ul className='text-muted-foreground list-disc space-y-1.5 pl-6 text-sm'>
              {(review.nextTimeChanges ?? []).map((item, i) => (
                <li key={i} className='leading-relaxed'>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
