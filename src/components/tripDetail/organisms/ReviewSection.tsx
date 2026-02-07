import { NotePencilIcon } from '@phosphor-icons/react/dist/ssr';
import type { TripReview } from '@/types/trip';

interface ReviewSectionProps {
  review?: TripReview;
}

const ReviewSection = ({ review }: ReviewSectionProps) => {
  if (!review) {
    return (
      <p className='text-muted-foreground text-sm'>작성된 후기가 없어요.</p>
    );
  }

  return (
    <section className='border-border bg-background rounded-2xl border p-5 md:p-6'>
      <h2 className='text-foreground mb-4 flex items-center gap-2 text-xl font-semibold'>
        <NotePencilIcon className='text-primary size-6' weight='fill' />
        후기
      </h2>

      <div className='text-foreground mb-6 text-sm leading-relaxed whitespace-pre-wrap'>
        {review.fullText}
      </div>

      <div className='space-y-5'>
        <div>
          <h3 className='text-foreground mb-2 flex items-center gap-1.5 text-sm font-semibold'>
            <span className='text-success'>✓</span> 추천 포인트
          </h3>
          <ul className='text-muted-foreground list-inside list-disc space-y-1 text-sm'>
            {(review.recommendPoints ?? []).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className='text-foreground mb-2 flex items-center gap-1.5 text-sm font-semibold'>
            <span className='text-warning'>△</span> 비추천 포인트
          </h3>
          <ul className='text-muted-foreground list-inside list-disc space-y-1 text-sm'>
            {(review.notRecommendPoints ?? []).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className='text-foreground mb-2 flex items-center gap-1.5 text-sm font-semibold'>
            <span className='text-accent'>→</span> 다음에 바꿀 점
          </h3>
          <ul className='text-muted-foreground list-inside list-disc space-y-1 text-sm'>
            {(review.nextTimeChanges ?? []).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
