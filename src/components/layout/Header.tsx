import Link from 'next/link';

const Header = () => {
  return (
    <header className='border-border bg-background border-b'>
      <div className='container mx-auto flex items-center justify-between gap-4 px-4 py-4'>
        {/* 로고 + 슬로건 */}
        <Link href='/' className='flex min-w-0 shrink-0 items-center gap-3'>
          <h1 className='from-primary to-accent bg-linear-to-r bg-clip-text text-xl font-bold text-transparent md:text-2xl'>
            팔로우트립
          </h1>
          <span className='border-border text-muted-foreground hidden border-l pl-3 text-sm md:inline'>
            여행을 그대로 따라가다
          </span>
        </Link>

        {/* 우측 액션 영역 */}
        {/* <nav className='flex shrink-0 items-center gap-2'>
          <Link
            href='/routes/new'
            className='bg-primary text-primary-foreground rounded-lg px-3 py-2 text-sm font-medium transition-opacity hover:opacity-90'
          >
            새 루트
          </Link>
        </nav> */}
      </div>
    </header>
  );
};

export default Header;
