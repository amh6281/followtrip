import Link from 'next/link';

interface ToolLinkCardProps {
  href: string;
  title: string;
  description: string;
}

const ToolLinkCard = ({ href, title, description }: ToolLinkCardProps) => {
  return (
    <Link
      href={href}
      className='from-background to-muted/30 border-border hover:border-primary/40 group flex items-center justify-between rounded-2xl border bg-linear-to-br p-5 transition-all hover:-translate-y-0.5 md:p-6'
    >
      <div>
        <p className='text-foreground text-base font-semibold'>{title}</p>
        <p className='text-muted-foreground mt-1 text-sm'>{description}</p>
      </div>
      <span className='text-muted-foreground group-hover:text-primary text-2xl transition-colors'>
        →
      </span>
    </Link>
  );
};

export default ToolLinkCard;
