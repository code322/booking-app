import db from '../config/db.js';

export const getAllLocations = async (req, res) => {
  try {
    const locations = 'SELECT * FROM Locations';
    const [data] = await db.query(locations);
    const response = data.map((items) => {
      let photo = JSON.parse(items.photos);
      return {
        ...items,
        utils: JSON.parse(items.utils),
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
      utils: JSON.parse(result.utils),
    };
    console.log(response);

    res.status(201).json(response);
  } catch (error) {
    res.status(401).json(error.message);
  }
};
export const addNewLocation = async (req, res) => {
  const newPlace = req.body;

  let perksStringify = JSON.stringify(newPlace.utils);
  let photosStringify = JSON.stringify(newPlace.photos);

  newPlace.utils = perksStringify;
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
    utils,
  } = newPlace;

  try {
    const insertPlace = `INSERT INTO Locations(title, address, description, extraInfo, checkIn, checkOut, guests, photos, utils) VALUES (?,?,?,?,?,?,?,?,?)`;

    let values = [
      title,
      address,
      description,
      extraInfo,
      checkIn,
      checkOut,
      guests,
      photos,
      utils,
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
