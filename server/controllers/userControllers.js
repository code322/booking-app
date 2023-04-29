import db from '../config/db.js';

export const getUserList = async (req, res) => {
  const requestedUserId = parseInt(req.params.id);
  const currentUser = req.user;

  if (currentUser.isAdmin) {
    try {
      const query = 'SELECT * FROM Locations';
      const [data] = await db.query(query);
      console.log(data);
      const response = data?.map((items) => {
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
    const query = 'SELECT * FROM Locations WHERE userId=?';
    const [data] = await db.query(query, requestedUserId);
    const response = data.map((items) => {
      return {
        ...items,
        utils: JSON.parse(items.utils),
        photos: JSON.parse(items.photos),
        details: JSON.parse(items.details),
      };
    });

    res.status(201).json(response);
  } else {
    res.status(401).json('Unauthorized');
  }
};

export const addNewList = async (req, res) => {
  let location = req.body;
  let userId = location.userId;
  console.log(userId, location);
  let details = JSON.stringify(location.details);
  let photos = JSON.stringify(location.photos);
  let utils = JSON.stringify(location.utils);

  try {
    const insertPlace = `INSERT INTO Locations(userId, details, photos, utils) VALUES (?,?,?,?)`;
    let values = [userId, details, photos, utils];
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

const getLocation = async (id) => {
  let query = 'SELECT * FROM Locations WHERE id=?';
  const [result] = await db.query(query, [id]);
  return result[0];
};
