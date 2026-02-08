'use client';

import { useSearchParams } from 'next/navigation';
import { FilterBar, TripList } from '../organisms';
import { CreateTrip } from '../molecules';
import { dummyTrips } from '@/data/dummy-trips';
import type { Trip } from '@/types/trip';
import { EmptyTrip, TripCount } from '../atoms';
import { Title } from '@/components/common';

const HomeTemplate = () => {
  const searchParams = useSearchParams();

  const location = searchParams.get('location');
  const duration = searchParams.get('duration');
  const sort = (searchParams.get('sort') as 'latest' | 'popular') || 'latest';

  // 필터링 및 정렬 로직
  const byLocation = (trip: Trip) => !location || trip.location === location;
  const byDuration = (trip: Trip) => !duration || trip.duration === duration;

  const sortByLatest = (a: Trip, b: Trip) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  const sortByPopular = (a: Trip, b: Trip) => b.likes - a.likes;

  const sortMap = {
    latest: sortByLatest,
    popular: sortByPopular,
  } as const;

  const filteredAndSortedTrips = dummyTrips
    .filter(byLocation)
    .filter(byDuration)
    .toSorted(sortMap[sort]);

  return (
    <div className='bg-background min-h-full flex-1'>
      <main className='container mx-auto max-w-6xl px-4 py-10 max-md:py-8'>
        <CreateTrip />

        <section className='mb-8'>
          <Title text='여행 코스' />
          <FilterBar />
        </section>

        <section>
          <TripCount count={filteredAndSortedTrips.length} />
          {filteredAndSortedTrips.length > 0 ? (
            <TripList trips={filteredAndSortedTrips} />
          ) : (
            <EmptyTrip />
          )}
        </section>
      </main>
    </div>
  );
};

export default HomeTemplate;
