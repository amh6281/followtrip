const SortGroup = () => {
  return (
    <div className='flex items-center gap-2'>
      <span className='text-muted-foreground text-xs font-semibold tracking-wide uppercase'>
        정렬
      </span>

      <div className='bg-muted flex gap-1 rounded-lg p-1'>
        <button className='cursor-pointer rounded-md px-3 py-1 text-sm transition-colors'>
          최신순
        </button>

        <button className='cursor-pointer rounded-md px-3 py-1 text-sm transition-colors'>
          인기순
        </button>
      </div>
    </div>
  );
};

export default SortGroup;
