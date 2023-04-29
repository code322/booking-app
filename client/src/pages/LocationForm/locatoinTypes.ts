export type utilsTypes = {
  wifi: boolean;
  netflex: boolean;
  hydro: boolean;
  parking: boolean;
  water: boolean;
  gym: boolean;
};

export type detailsTypes = {
  title: string;
  address: string;
  description: string;
  extraInfo: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  price?: string;
};

export interface locationTypes {
  id: number;
  userId: number;
  details: detailsTypes;
  utils: utilsTypes;
  photos: string[];
}
