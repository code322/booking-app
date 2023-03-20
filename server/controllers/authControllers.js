import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateTokens } from '../utils/generateTokens.js';
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

    if (!accessToken) return res.status(409).json('No access token');
    if (!refreshToken) return res.status(409).json('No refresh token');

    res.cookie('accessToken', `Bearer ${accessToken}`, {
      httpOnly: true,
      maxAge: 1000 * 60 * 30,
      secure: true,
      sameSite: 'none',
    });
    res.cookie('refreshToken', `Bearer ${refreshToken}`, {
      httpOnly: true,
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

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUser(email);
    if (!user) return res.status(409).json('User does not exist. ');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(409).json('Password is not valid.');

    const accessToken = generateTokens.accessToken(user.id);
    const refreshToken = generateTokens.refreshToken(user.id);

    if (!accessToken) return res.status(409).json('No access token');
    if (!refreshToken) return res.status(409).json('No refresh token');

    res.cookie('accessToken', accessToken, {
      httpOnly: false,
      maxAge: 1000 * 60 * 30,
      secure: true,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      secure: true,
      sameSite: 'none',
    });

    res.status(201).json({
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(409).json(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie('accessToken', '', {
      maxAge: 0,
      httpOnly: true,
    });
    res.cookie('refreshToken', '', {
      maxAge: 0,
      httpOnly: true,
    });
    res.status(200).json('Successfully Logged Out');
  } catch (error) {
    res.status(200).json(error.message);
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
export const refreshToken = (req, res) => {
  const cookies = req.cookies;
  const refreshToken = cookies.refreshToken?.split(' ')[1];
  console.log(cookies, 'refresh page');

  if (!refreshToken)
    return res
      .status(401)
      .json({ message: 'no refresh token. please login again' });

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

  if (decoded.exp * 1000 > new Date().getTime()) {
    req.user = decoded;
    const id = req.user.id;
    const accessToken = generateTokens.accessToken(id);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 30, // Units are in milliseconds. Sets to expire in 30 mins
    });

    res.status(200).json({ message: 'access token created' });
  } else {
    res.status(400).json({ message: 'token can not be verified' });
  }
};
