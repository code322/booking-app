import { locationType } from '../state/locations/locationsSlicer';

export const filterLocations = (
  search: string | undefined,
  maxBed: string,
  priceRange: number[],
  locations: locationType[]
) => {
  let Any: string = 'Any';
  let threeOrMoreBeds = '3+';
  const THREE = 3;
  // console.log(maxBed, threeOrMoreBeds);
  // if there is character
  if (search) {
    //search by char, price range and num of beds
    if (maxBed === '1' || maxBed === '2') {
      console.log('run 1', maxBed);
      let data = locations.filter((location) => {
        let guests = location?.details?.guests;
        let price = location?.details?.price;
        return (
          location?.details?.title
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) &&
          Number(price) >= priceRange[0] &&
          Number(price) <= priceRange[1] &&
          Number(guests) === Number(maxBed)
        );
      });
      return data;
    }
    // search by char, price range, and num of beds greater than 3
    else if (maxBed === threeOrMoreBeds) {
      console.log('max and bed');
      let data = locations.filter((location) => {
        let guests = location?.details?.guests;
        let price = location?.details?.price;

        return (
          location?.details?.title
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) &&
          Number(price) >= priceRange[0] &&
          Number(price) <= priceRange[1] &&
          Number(guests) >= THREE
        );
      });
      return data;
    }
    // filter only by prince range
    else {
      let data = locations.filter((location) => {
        let price = location?.details?.price;

        return (
          location?.details?.title
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) &&
          Number(price) >= priceRange[0] &&
          Number(price) <= priceRange[1]
        );
      });
      return data;
    }
  } else if (!search) {
    if (maxBed === '1' || maxBed === '2') {
      let data = locations.filter((location) => {
        let guests = location?.details?.guests;
        let price = location?.details?.price;
        return (
          Number(price) >= priceRange[0] &&
          Number(price) <= priceRange[1] &&
          Number(guests) === Number(maxBed)
        );
      });
      return data;
    } else if (maxBed === threeOrMoreBeds) {
      let data = locations.filter((location) => {
        let guests = location?.details?.guests;
        let price = location?.details?.price;
        return (
          Number(price) >= priceRange[0] &&
          Number(price) <= priceRange[1] &&
          Number(guests) >= THREE
        );
      });
      return data;
    } else if (maxBed === Any) {
      let data = locations.filter((location) => {
        let price = location?.details?.price;
        return Number(price) >= priceRange[0] && Number(price) <= priceRange[1];
      });
      return data;
    } else {
      return locations;
    }
  }
};
