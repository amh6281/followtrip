import { TripCard } from './index';
import type { Trip } from '@/types/trip';

interface TripListProps {
  trips: Trip[];
}

const TripList = ({ trips }: TripListProps) => {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
};

export default TripList;
