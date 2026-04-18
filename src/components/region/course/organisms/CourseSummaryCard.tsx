import {
  CurrencyCircleDollarIcon,
  ChartLineUpIcon,
  UserIcon,
} from '@phosphor-icons/react/dist/ssr';
import { CourseSummaryItem } from '../molecules';
import {
  formatCourseAudience,
  formatCourseBudget,
  formatCourseDifficulty,
} from '@/utils/selectors';
import type { CourseTemplate } from '@/types/travel';

interface CourseSummaryCardProps {
  course: CourseTemplate;
}

const CourseSummaryCard = ({ course }: CourseSummaryCardProps) => {
  return (
    <section className='border-border bg-background grid gap-4 rounded-2xl border p-5 md:grid-cols-3 md:gap-6 md:p-6'>
      <CourseSummaryItem
        icon={<CurrencyCircleDollarIcon className='size-6' />}
        label='예상 비용'
        value={formatCourseBudget(course)}
      />
      <CourseSummaryItem
        icon={<ChartLineUpIcon className='size-6' />}
        label='이동 난이도'
        value={formatCourseDifficulty(course)}
      />
      <CourseSummaryItem
        icon={<UserIcon className='size-6' />}
        label='추천 대상'
        value={formatCourseAudience(course)}
      />
    </section>
  );
};

export default CourseSummaryCard;
