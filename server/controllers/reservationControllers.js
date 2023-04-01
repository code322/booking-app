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
