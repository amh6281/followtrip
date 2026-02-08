import { BackLink, Title } from '@/components/common';
import { StepIndicator } from '../molecules';
import { BasicInfoStep } from '../organisms';

const CreateTripTemplate = () => {
  return (
    <div className='bg-background min-h-full flex-1'>
      <main className='container mx-auto max-w-2xl px-4 py-10 max-md:py-6'>
        <BackLink />

        <Title text='나의 여정 기록하기' />

        {/* 스텝 인디케이터 */}
        <nav
          className='border-border bg-background/80 mb-10 rounded-2xl border px-5 py-4 max-md:px-4 max-md:py-3'
          aria-label='작성 단계'
        >
          <StepIndicator />
        </nav>

        {/* 단계별 폼 */}
        <BasicInfoStep />
      </main>
    </div>
  );
};

export default CreateTripTemplate;
