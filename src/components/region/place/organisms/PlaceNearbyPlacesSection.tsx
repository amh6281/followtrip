import { PlaceLink } from '../molecules';
import { getRegionPlace } from '@/utils/region';
import type { RegionPlace } from '@/types/region';

interface PlaceNearbyPlacesSectionProps {
  nearbyPlaceSlugs: RegionPlace['nearbyPlaceSlugs'];
  regionId: string;
}

const PlaceNearbyPlacesSection = ({
  nearbyPlaceSlugs,
  regionId,
}: PlaceNearbyPlacesSectionProps) => {
  const nearbyPlaces = nearbyPlaceSlugs
    .map((slug) => getRegionPlace(slug))
    .filter((place): place is RegionPlace => place !== null);

  if (nearbyPlaces.length === 0) return null;

  return (
    <section className='space-y-4'>
      <h2 className='text-foreground text-lg font-semibold md:text-xl'>
        근처 장소
      </h2>
      <div className='grid gap-3 sm:grid-cols-2'>
        {nearbyPlaces.map((place) => (
          <PlaceLink
            key={place.slug}
            href={`/${regionId}/place/${place.slug}`}
            name={place.name}
            address={place.address}
          />
        ))}
      </div>
    </section>
  );
};

export default PlaceNearbyPlacesSection;
