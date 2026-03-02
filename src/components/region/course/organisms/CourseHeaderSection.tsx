import { BackLink } from '@/components/common';
import type { RegionCourse } from '@/types/region';

interface CourseHeaderSectionProps {
  regionId: string;
  regionName: string;
  course: RegionCourse;
}

const CourseHeaderSection = ({
  regionId,
  regionName,
  course,
}: CourseHeaderSectionProps) => {
  return (
    <section className='border-border relative overflow-hidden border-b px-4 py-10 md:px-6 md:py-14'>
      <div className='bg-sunset/15 absolute -top-28 -right-20 h-64 w-64 rounded-full blur-3xl' />
      <div className='bg-accent/20 absolute -bottom-24 -left-16 h-56 w-56 rounded-full blur-3xl' />

      <div className='relative mx-auto max-w-6xl space-y-6'>
        <BackLink href={`/${regionId}`}>{regionName}으로 돌아가기</BackLink>
        <div className='max-w-2xl space-y-3'>
          <p className='text-primary border-primary/30 bg-primary/10 inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold tracking-wide uppercase'>
            {course.difficulty} · {course.target}
          </p>
          <h1 className='text-foreground text-3xl leading-tight font-bold tracking-tight md:text-4xl'>
            {course.title}
          </h1>
          <p className='text-muted-foreground text-sm md:text-base'>
            {course.summary}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CourseHeaderSection;
