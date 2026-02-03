const EmptyTripList = () => {
  return (
    <div className='flex flex-col items-center justify-center py-16 text-center'>
      <p className='text-muted-foreground text-lg'>
        조건에 맞는 루트가 없습니다.
      </p>
      <p className='text-muted-foreground mt-2 text-sm'>
        다른 필터를 선택해보세요.
      </p>
    </div>
  );
};

export default EmptyTripList;
