import db from '../config/db.js';
import { filterLocations } from '../utils/filterLocation.js';

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

export const getFilteredLocations = async (req, res) => {
  const { query, minPrice, maxPrice, maxBeds } = req.query;

  try {
    let [data] = await db.query('SELECT * FROM Locations');
    const response = data.map((items) => {
      return {
        ...items,
        utils: JSON.parse(items.utils),
        photos: JSON.parse(items.photos),
        details: JSON.parse(items.details),
      };
    });

    let result = filterLocations(query, maxBeds, minPrice, maxPrice, response);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};
const getLocation = async (id) => {
  let query = 'SELECT * FROM Locations WHERE id=?';
  const [result] = await db.query(query, [id]);
  return result[0];
};
