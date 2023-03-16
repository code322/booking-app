import db from '../config/db.js';

export const getAllLocations = async (req, res) => {
  try {
    const locations = 'SELECT * FROM Locations';
    const [data] = await db.query(locations);

    res.status(201).json(data);
  } catch (error) {
    res.status(409).json(error.message);
  }
};
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

    const [result] = await db.query(insertPlace, values);

    const [data] = await db.query('SELECT * FROM Locations WHERE id=?', [
      result.insertId,
    ]);

    res.status(200).json(data[0]);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
