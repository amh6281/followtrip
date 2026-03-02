import Link from 'next/link';

interface PlaceCourseLinkProps {
  href: string;
  title: string;
}

const PlaceCourseLink = ({ href, title }: PlaceCourseLinkProps) => {
  return (
    <Link
      href={href}
      className='text-foreground border-border bg-background hover:border-primary/40 hover:text-primary rounded-xl border px-4 py-2 text-sm font-medium transition-colors'
    >
      {title}
    </Link>
  );
};

export default PlaceCourseLink;
