import { TripCard } from './index';
import type { Trip } from '@/types/trip';

interface TripListProps {
  trips: Trip[];
}

const TripList = ({ trips }: TripListProps) => {
  return (
    <div className='grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1'>
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
};

export default TripList;
