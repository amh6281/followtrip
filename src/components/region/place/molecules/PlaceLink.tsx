import Link from 'next/link';
import { MapPinIcon } from '@phosphor-icons/react/dist/ssr';

interface PlaceLinkProps {
  href: string;
  name: string;
  address: string;
}

const PlaceLink = ({ href, name, address }: PlaceLinkProps) => {
  return (
    <Link
      href={href}
      className='border-border bg-background hover:border-primary/40 hover:text-primary group flex flex-col gap-1 rounded-xl border p-4 transition-colors'
    >
      <span className='text-foreground text-sm font-medium'>{name}</span>
      <span className='text-muted-foreground flex items-center gap-1.5 text-xs'>
        <MapPinIcon className='size-3 shrink-0' />
        {address}
      </span>
    </Link>
  );
};

export default PlaceLink;
