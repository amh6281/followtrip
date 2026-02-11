import Image from 'next/image';

const CoverImageStep = () => {
  // 입력 시 미리보기 이미지 출력
  const thumbnail = '';

  return (
    <div className='space-y-6'>
      <p className='text-muted-foreground text-sm'>
        대표 사진 URL을 입력하세요.
      </p>

      <div className='border-border overflow-hidden rounded-2xl border'>
        <div className='bg-muted relative aspect-video w-full'>
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt='대표 사진 미리보기'
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 800px'
            />
          ) : (
            <div className='text-muted-foreground flex h-full items-center justify-center text-sm'>
              미리보기
            </div>
          )}
        </div>
        <div className='p-4'>
          <label
            htmlFor='thumbnail'
            className='text-foreground mb-2 block text-sm font-medium'
          >
            대표 사진 URL
          </label>
          <input
            id='thumbnail'
            type='url'
            placeholder='https://...'
            className='border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary w-full rounded-xl border px-4 py-3 text-base transition-colors outline-none'
          />
        </div>
      </div>
    </div>
  );
};

export default CoverImageStep;
