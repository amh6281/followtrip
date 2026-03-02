import type { ReactNode } from 'react';

interface CourseSummaryItemProps {
  icon: ReactNode;
  label: string;
  value: string;
}

const CourseSummaryItem = ({ icon, label, value }: CourseSummaryItemProps) => {
  return (
    <div className='flex items-center gap-3'>
      <span className='text-primary shrink-0'>{icon}</span>
      <div>
        <p className='text-muted-foreground text-xs'>{label}</p>
        <p className='text-foreground font-semibold'>{value}</p>
      </div>
    </div>
  );
};

export default CourseSummaryItem;
