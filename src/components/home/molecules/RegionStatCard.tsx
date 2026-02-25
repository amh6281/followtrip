interface RegionStatCardProps {
  count: number;
  label?: string;
  subLabel?: string;
}

const RegionStatCard = ({
  count,
  label = '지역 수',
  subLabel = '업데이트 중',
}: RegionStatCardProps) => {
  return (
    <div className='border-border bg-background/85 hidden rounded-2xl border p-4 text-right shadow-sm backdrop-blur md:block'>
      <p className='text-muted-foreground text-xs'>{label}</p>
      <p className='text-foreground mt-1 text-2xl font-semibold'>{count}</p>
      <p className='text-muted-foreground mt-1 text-xs'>{subLabel}</p>
    </div>
  );
};

export default RegionStatCard;
