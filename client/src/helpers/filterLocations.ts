import { locationType } from '../state/locations/locationsSlicer';

export const filterLocations = (
  search: string | undefined,
  maxBed: string,
  priceRange: number[],
  locations: locationType[]
) => {
  const filteredLocations = locations.filter((location) => {
    const address = location?.details?.address;
    const guests = location?.details?.guests;
    const price = location?.details?.price;

    // Filter by search query
    if (
      search &&
      !address?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    ) {
      return false;
    }

    // Filter by maxBed
    if (maxBed !== 'Any') {
      if (maxBed === '3+') {
        if (Number(guests) < 3) {
          return false;
        }
      } else if (Number(guests) !== Number(maxBed)) {
        return false;
      }
    }

    // Filter by price range
    if (Number(price) < priceRange[0] || Number(price) > priceRange[1]) {
      return false;
    }

    return true;
  });

  return filteredLocations;
};
