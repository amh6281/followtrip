import clsx from 'clsx';

interface AdSlotProps {
  label?: string;
  className?: string;
}

const AdSlot = ({ label, className }: AdSlotProps) => {
  return (
    <div
      className={clsx(
        'border-border text-muted-foreground flex min-h-32 items-center justify-center rounded-2xl border border-dashed bg-[#F2F2F2] text-sm',
        className,
      )}
      aria-label={label}
    >
      {label}
    </div>
  );
};

export default AdSlot;
