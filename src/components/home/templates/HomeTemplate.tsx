'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { FilterBar, TripList } from '../organisms';

import { dummyTrips } from '@/data/dummy-trips';
import type { Trip } from '@/types/trip';
import { EmptyTrip, TripCount } from '../atoms';

const HomeTemplate = () => {
  const searchParams = useSearchParams();

  const location = searchParams.get('location');
  const duration = searchParams.get('duration');
  const sort = (searchParams.get('sort') as 'latest' | 'popular') || 'latest';

  const filteredAndSortedTrips = useMemo(() => {
    const byLocation = (trip: Trip) => !location || trip.location === location;

    const byDuration = (trip: Trip) => !duration || trip.duration === duration;

    const sortByLatest = (a: Trip, b: Trip) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

    const sortByPopular = (a: Trip, b: Trip) => b.likes - a.likes;

    const sortMap = {
      latest: sortByLatest,
      popular: sortByPopular,
    } as const;

    return dummyTrips
      .filter(byLocation)
      .filter(byDuration)
      .toSorted(sortMap[sort]);
  }, [location, duration, sort]);

  return (
    <div className='bg-background min-h-screen'>
      {/* 메인 컨텐츠 */}
      <main className='container mx-auto px-4 py-8'>
        {/* 필터 바 */}
        <FilterBar />
        {/* 결과 카운트 */}
        <TripCount count={filteredAndSortedTrips.length} />
        {/* 여행지 리스트 */}
        {filteredAndSortedTrips.length > 0 ? (
          <TripList trips={filteredAndSortedTrips} />
        ) : (
          <EmptyTrip />
        )}
      </main>
    </div>
  );
};

export default HomeTemplate;
