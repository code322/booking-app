import db from '../config/db.js';

export const addNewLocation = async (req, res) => {
  const newPlace = req.body;

  let perksStringify = JSON.stringify(newPlace.perks);
  let photosStringify = JSON.stringify(newPlace.photos);

  newPlace.perks = perksStringify;
  newPlace.photos = photosStringify;

  const {
    title,
    address,
    description,
    extraInfo,
    checkIn,
    checkOut,
    guests,
    photos,
    perks,
  } = newPlace;

  try {
    const insertPlace = `INSERT INTO Locations(title, address, description, extraInfo, checkIn, checkOut, guests, photos, perks) VALUES (?,?,?,?,?,?,?,?,?)`;

    let values = [
      title,
      address,
      description,
      extraInfo,
      checkIn,
      checkOut,
      guests,
      photos,
      perks,
    ];

    await db.query(insertPlace, values);

    res.status(200).json('New location added successfully');
  } catch (error) {
    res.status(400).json(error.message);
  }
};
