import { BackLink } from '@/components/common';

const NotFound = () => {
  return (
    <div className='flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4'>
      <div className='space-y-4 text-center'>
        <h1 className='text-foreground text-4xl font-bold md:text-5xl'>404</h1>
        <p className='text-muted-foreground text-lg'>
          요청하신 페이지를 찾을 수 없습니다.
        </p>
        <BackLink href='/' className='hover:text-primary mt-6'>
          홈으로 돌아가기
        </BackLink>
      </div>
    </div>
  );
};

export default NotFound;
