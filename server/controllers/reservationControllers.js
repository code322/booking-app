import db from '../config/db.js';
export const getAllReserves = async (req, res) => {
  const requestedUserId = parseInt(req.params.id);
  const currentUser = req.user;

  if (currentUser.isAdmin) {
    try {
      const locations =
        'SELECT * FROM Locations INNER JOIN Reservations ON Locations.id = Reservations.locationId ';
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
  } else if (currentUser.id === requestedUserId) {
    try {
      const query = `SELECT r.*, l.*
    FROM Reservations r
    JOIN Locations l ON r.locationId = l.id
    WHERE r.userId =?`;
      const [data] = await db.query(query, [requestedUserId]);
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
  } else {
    res.status(401).json('Not authorized');
  }
};

export const addNewReservation = async (req, res) => {
  let { checkIn, checkOut, locationId, totalCost } = req.body;

  try {
    const reserveLocation = `INSERT INTO Reservations(checkIn, checkOut, locationId, totalCost) VALUES (?,?,?,?)`;

    let values = [checkIn, checkOut, locationId, totalCost];

    const [data] = await db.query(reserveLocation, values);

    let reserved = await getReservedLocation(data.insertId);
    let locationInfo = await getLocation(locationId);

    let response = {
      ...reserved,
      ...locationInfo,
      details: JSON.parse(locationInfo?.details),
      photos: JSON.parse(locationInfo?.photos),
      utils: JSON.parse(locationInfo?.utils),
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const deleteReservation = async (req, res) => {
  const { id } = req.params;
  let deleteReservation = 'DELETE FROM Reservations WHERE id=?';
  try {
    await db.query(deleteReservation, [id]);
    return res.status(200).json('Deleted Successfully');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const getLocation = async (id) => {
  let query = 'SELECT * FROM Locations WHERE id=?';
  const [result] = await db.query(query, [id]);
  return result[0];
};
const getReservedLocation = async (id) => {
  let query = 'SELECT * FROM Reservations WHERE id=?';
  const [result] = await db.query(query, [id]);
  return result[0];
};
