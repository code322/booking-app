import db from '../config/db.js';

export const getUserData = async (req, res) => {
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
