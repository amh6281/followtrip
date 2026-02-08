import Link from 'next/link';
import { PlusCircleIcon } from '@phosphor-icons/react/dist/ssr';

const CreateTrip = () => {
  return (
    <section
      className='border-primary/10 bg-primary/5 mb-8 rounded-2xl border p-5 max-md:p-4'
      aria-labelledby='create-trip-cta-title'
    >
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <p id='create-trip-cta-title' className='text-foreground font-medium'>
            나의 여정을 기록해보세요
          </p>
          <p className='text-muted-foreground mt-0.5 text-sm'>
            그대로 따라가면 되는 여행, 누군가에게 도움이 될 거예요.
          </p>
        </div>
        <Link
          href='/trips/new'
          className='bg-primary text-primary-foreground inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90'
        >
          <PlusCircleIcon size={22} weight='duotone' />
          여정 기록하기
        </Link>
      </div>
    </section>
  );
};

export default CreateTrip;
