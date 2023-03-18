import db from '../config/db.js';

export const getAllLocations = async (req, res) => {
  try {
    const locations = 'SELECT * FROM Locations';
    const [data] = await db.query(locations);
    const response = data.map((items) => {
      return {
        ...items,
        utils: JSON.parse(items.utils),
        photos: JSON.parse(items.photos),
        details: JSON.parse(items.details),
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
      details: JSON.parse(result.details),
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
  let location = req.body;
  let details = JSON.stringify(location.details);
  let photos = JSON.stringify(location.photos);
  let utils = JSON.stringify(location.utils);

  try {
    const insertPlace = `INSERT INTO Locations(details, photos, utils) VALUES (?,?,?)`;

    let values = [details, photos, utils];

    const [result] = await db.query(insertPlace, values);

    const [data] = await db.query('SELECT * FROM Locations WHERE id=?', [
      result.insertId,
    ]);

    res.status(200).json(data[0]);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
