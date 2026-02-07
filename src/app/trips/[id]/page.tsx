import TripDetailTemplate from '@/components/tripDetail/templates/TripDetailTemplate';
import { getTripDetail } from '@/data/dummy-trip-details';
import { notFound } from 'next/navigation';

interface TripDetailPageProps {
  params: Promise<{ id: string }>;
}

const TripDetailPage = async ({ params }: TripDetailPageProps) => {
  const { id } = await params;
  const detail = getTripDetail(id) ?? notFound();

  return <TripDetailTemplate detail={detail} />;
};

export default TripDetailPage;
