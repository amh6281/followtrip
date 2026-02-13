import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react/dist/ssr';

interface StepNavProps {
  onPrev: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const StepNav = ({ onPrev, onNext, isFirstStep, isLastStep }: StepNavProps) => {
  return (
    <div className='border-border mt-10 flex justify-between gap-4 border-t pt-8'>
      {!isFirstStep && (
        <button
          type='button'
          onClick={onPrev}
          disabled={isFirstStep}
          className='text-muted-foreground hover:text-foreground inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-colors disabled:opacity-40'
        >
          <CaretLeftIcon size={20} weight='bold' />
          이전
        </button>
      )}

      {isLastStep ? (
        <button
          type='button'
          className='text-primary-foreground bg-primary ml-auto inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90'
        >
          게시하기
        </button>
      ) : (
        <button
          type='button'
          onClick={onNext}
          className='text-primary-foreground bg-primary ml-auto inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90'
        >
          다음
          <CaretRightIcon size={20} weight='bold' />
        </button>
      )}
    </div>
  );
};

export default StepNav;
