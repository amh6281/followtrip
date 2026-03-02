import type { RegionPlace } from '@/types/region';

interface PlaceTipsSectionProps {
  tips: RegionPlace['tips'];
}

const PlaceTipsSection = ({ tips }: PlaceTipsSectionProps) => {
  if (tips.length === 0) return null;

  return (
    <section className='space-y-4'>
      <h2 className='text-foreground text-lg font-semibold md:text-xl'>
        방문 팁
      </h2>
      <ul className='border-border bg-background divide-border space-y-0 divide-y overflow-hidden rounded-2xl border'>
        {tips.map((tip, i) => (
          <li
            key={i}
            className='text-muted-foreground px-4 py-3 text-sm md:px-6'
          >
            {tip}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PlaceTipsSection;
