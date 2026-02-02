import { FilterBar, TripCard } from '../organisms';
import { dummyTrips } from '@/data/dummy-trips';

const HomeTemplate = () => {
  return (
    <div className='bg-background min-h-screen'>
      {/* 메인 컨텐츠 */}
      <main className='container mx-auto px-4 py-8'>
        {/* 필터 바 */}
        <FilterBar />

        {/* 결과 카운트 */}
        <div className='text-muted-foreground mb-6 text-sm'>총 3개의 루트</div>

        {/* 루트 리스트 */}
        {dummyTrips.length > 0 ? (
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {dummyTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center py-16 text-center'>
            <p className='text-muted-foreground text-lg'>
              조건에 맞는 루트가 없습니다.
            </p>
            <p className='text-muted-foreground mt-2 text-sm'>
              다른 필터를 선택해보세요.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomeTemplate;
