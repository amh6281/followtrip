import Link from 'next/link';
import { ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr';
import clsx from 'clsx';

interface BackLinkProps {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}

const BackLink = ({
  href = '/',
  children = '목록으로',
  className,
}: BackLinkProps) => {
  return (
    <Link
      href={href}
      className={clsx(
        'text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2 py-2 pr-2 text-sm font-medium transition-colors',
        className,
      )}
    >
      <ArrowLeftIcon size={20} weight='bold' />
      {children}
    </Link>
  );
};

export default BackLink;
