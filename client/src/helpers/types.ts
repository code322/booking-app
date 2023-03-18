export type utilsTypes = {
  wifi: boolean;
  TV: boolean;
  pet: boolean;
  ['free parking spot']: boolean;
  radio: boolean;
  ['private entrance']: boolean;
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

export const initialPerks: utilsTypes = {
  wifi: false,
  TV: false,
  pet: false,
  ['free parking spot']: false,
  radio: false,
  ['private entrance']: false,
};
