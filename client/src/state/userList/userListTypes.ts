export type newLocationType = {
  userId: number;
  details: {
    title: string;
    address: string;
    description: string;
    extraInfo: string;
    checkIn: string;
    checkOut: string;
    guests: string;
  };
  photos: string[];
  utils: {
    wifi: boolean;
    netflex: boolean;
    hydro: boolean;
    parking: boolean;
    water: boolean;
    gym: boolean;
  };
};

export type idsType = {
  id: number;
  listId: number;
};
