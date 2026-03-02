import clsx from 'clsx';
import Link from 'next/link';

interface ToolLinkCardProps {
  href: string;
  title: string;
  description: string;
  className?: string;
}

const ToolLinkCard = ({
  href,
  title,
  description,
  className,
}: ToolLinkCardProps) => {
  return (
    <Link
      href={href}
      className={clsx(
        'border-border hover:border-primary/40 hover:bg-primary/5 group flex items-center justify-between rounded-2xl border p-5 transition-all md:p-6',
        className,
      )}
    >
      <div>
        <p className='text-foreground group-hover:text-primary text-base font-semibold transition-colors'>
          {title}
        </p>
        <p className='text-muted-foreground mt-1 text-sm'>{description}</p>
      </div>
      <span className='text-muted-foreground group-hover:text-primary text-2xl transition-colors'>
        →
      </span>
    </Link>
  );
};

export default ToolLinkCard;
