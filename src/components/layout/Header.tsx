import Link from 'next/link';

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
      </div>
    </header>
  );
};

export default Header;
