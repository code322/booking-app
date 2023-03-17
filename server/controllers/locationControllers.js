import db from '../config/db.js';

export const getAllLocations = async (req, res) => {
  try {
    const locations = 'SELECT * FROM Locations';
    const [data] = await db.query(locations);
    const response = data.map((items) => {
      let photo = JSON.parse(items.photos);
      return {
        ...items,
        perks: JSON.parse(items.perks),
        photos: photo,
      };
    });

    res.status(201).json(response);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

export const getLocationById = async (req, res) => {
  let { id } = req.params;

  try {
    const [data] = await db.query('SELECT * FROM Locations WHERE id=?', [id]);
    let result = data[0];
    let response = {
      ...result,
      photos: JSON.parse(result.photos),
      perks: JSON.parse(result.perks),
    };
    console.log(response);

    res.status(201).json(response);
  } catch (error) {
    res.status(401).json(error.message);
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
