import type { ReactNode } from 'react';

interface PlaceInfoItemProps {
  icon: ReactNode;
  label: string;
  value: string;
  gridColSpan?: 1 | 2;
}

const PlaceInfoItem = ({
  icon,
  label,
  value,
  gridColSpan = 1,
}: PlaceInfoItemProps) => {
  return (
    <div
      className={`flex items-start gap-3 ${gridColSpan === 2 ? 'md:col-span-2' : ''}`}
    >
      <span className='text-primary mt-0.5 shrink-0'>{icon}</span>
      <div>
        <dt className='text-foreground font-medium'>{label}</dt>
        <dd className='text-muted-foreground text-sm'>{value}</dd>
      </div>
    </div>
  );
};

export default PlaceInfoItem;
