interface TripCountProps {
  count: number;
}

const TripCount = ({ count }: TripCountProps) => {
  return (
    <div className='text-muted-foreground mb-6 text-sm'>
      총 {count}개의 루트
    </div>
  );
};

export default TripCount;
