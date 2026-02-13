import { PlusIcon, TrashIcon } from '@phosphor-icons/react/dist/ssr';

interface ReviewPointProps {
  title: string;
}

const ReviewPoint = ({ title }: ReviewPointProps) => {
  return (
    <div>
      <div className='mb-2 flex items-center justify-between'>
        <label className='text-foreground text-sm font-medium'>{title}</label>
        <button
          type='button'
          className='text-primary hover:bg-primary/10 flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium'
        >
          <PlusIcon size={14} weight='bold' />
          추가
        </button>
      </div>
      <ul className='space-y-2'>
        <li className='flex gap-2'>
          <input
            type='text'
            placeholder='한 줄 입력'
            className='border-border bg-background text-foreground focus:border-primary w-full rounded-lg border px-3 py-2 text-sm transition-colors outline-none'
          />
          <button
            type='button'
            className='text-muted-foreground hover:text-error shrink-0 rounded-lg p-2 transition-colors'
            aria-label='삭제'
          >
            <TrashIcon size={18} weight='bold' />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ReviewPoint;
