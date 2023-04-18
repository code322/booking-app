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

    const [data] = await db.query(insertPlace, values);

    let result = await getLocation(data.insertId);

    let response = {
      ...result,
      details: JSON.parse(result?.details),
      photos: JSON.parse(result?.photos),
      utils: JSON.parse(result?.utils),
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const deleteLocation = async (req, res) => {
  const id = req.params.id;
  let deleteLocation = 'DELETE FROM Locations WHERE id=?';
  try {
    await db.query(deleteLocation, [id]);
    return res.status(200).json('Deleted Successfully');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const updateLocation = async (req, res) => {
  let location = req.body;
  let id = req.params.id;
  let details = JSON.stringify(location?.details);
  let photos = JSON.stringify(location?.photos);
  let utils = JSON.stringify(location?.utils);
  try {
    let values = [details, photos, utils, id];
    let update = 'UPDATE Locations SET details=? ,photos=? ,utils=? WHERE id=?';
    const [data] = await db.query(update, values);

    let result = await getLocation(id);
    let response = {
      ...result,
      details: JSON.parse(result?.details),
      photos: JSON.parse(result?.photos),
      utils: JSON.parse(result?.utils),
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getLocation = async (id) => {
  let query = 'SELECT * FROM Locations WHERE id=?';
  const [result] = await db.query(query, [id]);
  return result[0];
};

export const getFilteredLocations = async (req, res) => {
  try {
    const body = await req.query;
    console.log(body);
    res.status(200).json(body);
  } catch (error) {
    res.status(400).json(error);
  }
};
