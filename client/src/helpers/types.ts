export type utilsTypes = {
  wifi: boolean;
  netflex: boolean;
  hydro: boolean;
  parking: boolean;
  water: boolean;
  gym: boolean;
};

export type inputTypes = {
  title: string;
  address: string;
  description: string;
  extraInfo: string;
  checkIn: string;
  checkOut: string;
  guests: string;
};

export const initialInput: inputTypes = {
  title: '',
  address: '',
  description: '',
  extraInfo: '',
  checkIn: '',
  checkOut: '',
  guests: '1',
};

export const initialUtils: utilsTypes = {
  wifi: false,
  netflex: false,
  hydro: false,
  parking: false,
  water: false,
  gym: false,
};
