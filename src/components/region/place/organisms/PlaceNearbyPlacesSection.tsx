import { PlaceLink } from '../molecules';
import { placeById } from '@/utils/selectors';
import type { RegionPlace } from '@/types/travel';

interface PlaceNearbyPlacesSectionProps {
  nearbyPlaceIds: RegionPlace['nearbyPlaceIds'];
  regionId: string;
  placeHrefBuilder?: (place: RegionPlace) => string;
}

const PlaceNearbyPlacesSection = ({
  nearbyPlaceIds,
  regionId,
  placeHrefBuilder,
}: PlaceNearbyPlacesSectionProps) => {
  const nearbyPlaces = nearbyPlaceIds
    .map((placeId) => placeById(placeId))
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
            href={placeHrefBuilder?.(place) ?? `/${regionId}/place/${place.id}`}
            name={place.name}
            address={place.address}
          />
        ))}
      </div>
    </section>
  );
};

export default PlaceNearbyPlacesSection;
