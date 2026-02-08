import Link from 'next/link';
import { ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr';

interface BackLinkProps {
  href?: string;
  children?: React.ReactNode;
}

const BackLink = ({ href = '/', children = '목록으로' }: BackLinkProps) => {
  return (
    <Link
      href={href}
      className='text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2 py-2 pr-2 text-sm font-medium transition-colors'
    >
      <ArrowLeftIcon size={20} weight='bold' />
      {children}
    </Link>
  );
};

export default BackLink;
