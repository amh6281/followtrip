import Link from 'next/link';
import { ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr';
import clsx from 'clsx';
import type { ComponentProps, ReactNode } from 'react';

interface BackLinkProps extends Omit<
  ComponentProps<typeof Link>,
  'href' | 'children'
> {
  href?: ComponentProps<typeof Link>['href'];
  children?: ReactNode;
  className?: string;
}

const BackLink = ({
  href = '/',
  children = '목록으로',
  className,
  ...props
}: BackLinkProps) => {
  return (
    <Link
      href={href}
      {...props}
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
