import Link from 'next/link';
import { PencilSimpleLineIcon } from '@phosphor-icons/react/dist/ssr';

const Header = () => {
  return (
    <header className='border-border bg-background/95 supports-backdrop-filter:bg-background/80 sticky top-0 z-30 border-b'>
      <div className='container mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4'>
        <Link
          href='/'
          className='flex min-w-0 shrink-0 items-center gap-3 transition-opacity hover:opacity-90'
        >
          <h1 className='from-primary to-accent bg-linear-to-r bg-clip-text text-2xl font-bold text-transparent max-md:text-xl'>
            팔로우트립
          </h1>
          <span className='border-border text-muted-foreground inline border-l pl-3 text-sm max-md:hidden'>
            여행을 그대로 따라가다
          </span>
        </Link>
        <Link
          href='/trips/new'
          className='text-primary border-primary/40 flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors max-md:px-3 max-md:py-2 max-md:text-xs'
          aria-label='나의 여정 기록하기'
        >
          <PencilSimpleLineIcon
            size={18}
            weight='duotone'
            className='max-md:size-4'
          />
          <span className='max-md:hidden'>여정 기록하기</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
