import { ReviewPoint } from '../molecules';

const ReviewStep = () => {
  return (
    <div className='space-y-6'>
      <p className='text-muted-foreground text-sm'>후기는 선택 사항입니다.</p>

      <div>
        <label
          htmlFor='fullText'
          className='text-foreground mb-2 block text-sm font-medium'
        >
          전체 후기
        </label>
        <textarea
          id='fullText'
          placeholder='이번 여행에 대한 전반적인 후기를 적어주세요.'
          rows={5}
          className='border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary w-full resize-y rounded-xl border px-4 py-3 text-base transition-colors outline-none placeholder:text-sm'
        />
      </div>

      <ReviewPoint title='추천 포인트' />
      <ReviewPoint title='비추천 포인트' />
      <ReviewPoint title='다음에 바꿀 점' />
    </div>
  );
};

export default ReviewStep;
