import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await getUser(email);
    if (userExists) return res.status(409).json('Email is already registered');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const registerUser = `INSERT INTO Users (name, email, password) VALUES(?,?,?)`;
    const values = [name, email, hashPassword];

    await db.query(registerUser, values);

    const access_token = process.env.ACCESS_TOKEN;
    const refresh_token = process.env.REFRESH_TOKEN;

    const user = await getUser(email);

    const accessToken = jwt.sign({ id: user.id }, access_token, {
      expiresIn: 60 * 30,
    });
    const refreshToken = jwt.sign({ id: user.id }, refresh_token, {
      expiresIn: '30d',
    });

    console.log(refreshToken);

    if (!accessToken) return res.status(409).json('No access token');
    if (!refreshToken) return res.status(409).json('No refresh token');

    res.cookie('accessToken', `Bearer ${accessToken}`, {
      httpOnly: false,
      maxAge: 1000 * 60 * 30,
      secure: true,
    });
    res.cookie('refreshToken', `Bearer ${refreshToken}`, {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      secure: true,
      sameSite: 'none',
    });

    res.status(201).json({
      user: {
        name,
        email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(409).json(error);
  }
};

async function getUser(email) {
  try {
    const [user] = await db.query('SELECT * From Users WHERE email=?', [email]);
    return user[0];
  } catch (error) {
    return error;
  }
}
