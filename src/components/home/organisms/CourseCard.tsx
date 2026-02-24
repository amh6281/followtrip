import Link from 'next/link';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr';
import type { RegionCourse } from '@/types/region';

interface CourseCardProps {
  course: RegionCourse;
  href: string;
}

const CourseCard = ({ course, href }: CourseCardProps) => {
  return (
    <Link
      href={href}
      className='border-border bg-background group hover:border-primary/40 relative block overflow-hidden rounded-2xl border p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg md:p-5'
    >
      <div className='bg-sunset/10 absolute -top-10 -right-10 size-24 rounded-full blur-2xl transition-opacity group-hover:opacity-90' />

      <p className='text-foreground group-hover:text-primary relative text-base leading-snug font-semibold transition-colors md:text-lg'>
        {course.title}
      </p>
      <p className='text-muted-foreground relative mt-2 line-clamp-2 text-sm'>
        {course.summary}
      </p>

      <div className='relative mt-4 flex items-center justify-between'>
        <p className='text-muted-foreground text-xs'>
          {course.budgetRange} · {course.difficulty}
        </p>
        <span className='text-muted-foreground group-hover:text-primary inline-flex items-center gap-1 text-xs font-medium transition-colors'>
          자세히 보기
          <ArrowRightIcon size={14} />
        </span>
      </div>
    </Link>
  );
};

export default CourseCard;
