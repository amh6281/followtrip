import clsx from 'clsx';
import Link from 'next/link';

interface RegionFilterChipProps {
  regionId: string;
  name: string;
  isActive: boolean;
}

const RegionFilterChip = ({
  regionId,
  name,
  isActive,
}: RegionFilterChipProps) => {
  return (
    <Link
      href={`/${regionId}`}
      className={clsx(
        'group rounded-full border px-4 py-2 text-sm font-medium transition-all',
        isActive
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-border bg-background text-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary hover:-translate-y-0.5',
      )}
    >
      {name}
    </Link>
  );
};

export default RegionFilterChip;
