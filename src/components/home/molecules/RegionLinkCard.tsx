import Link from 'next/link';
import { MapPinIcon } from '@phosphor-icons/react/dist/ssr';

interface RegionLinkCardProps {
  regionId: string;
  name: string;
}

const RegionLinkCard = ({ regionId, name }: RegionLinkCardProps) => {
  return (
    <Link
      href={`/${regionId}`}
      className='border-border bg-background hover:border-primary/40 hover:bg-primary/5 group flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition-all hover:-translate-y-0.5'
    >
      <span className='text-foreground group-hover:text-primary transition-colors'>{name}</span>
      <MapPinIcon className='text-muted-foreground group-hover:text-primary size-4 transition-colors' />
    </Link>
  );
};

export default RegionLinkCard;
