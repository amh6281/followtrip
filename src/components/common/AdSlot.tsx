import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

type AdSlotProps = ComponentPropsWithoutRef<'div'> & {
  label?: string;
  className?: string;
};

const AdSlot = ({ label, className, ...props }: AdSlotProps) => {
  return (
    <div
      {...props}
      className={clsx(
        'border-border text-muted-foreground flex min-h-32 items-center justify-center rounded-2xl border border-dashed bg-[#F2F2F2] text-sm',
        className,
      )}
      aria-hidden='true'
    >
      {label}
    </div>
  );
};

export default AdSlot;
