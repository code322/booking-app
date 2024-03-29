import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateTokens } from '../utils/generateTokens.js';
import { REFRESH_TOKEN_LIFE_TIME } from '../config/jwt.js';
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

    const user = await getUser(email);

    const accessToken = generateTokens.accessToken(user.id, user.isAdmin);
    const refreshToken = generateTokens.refreshToken(user.id, user.isAdmin);

    if (!accessToken) return res.status(409).json('No access token');
    if (!refreshToken) return res.status(409).json('No refresh token');

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * REFRESH_TOKEN_LIFE_TIME,
      secure: true,
      sameSite: 'none',
      // domain: process.env.COOKIES_DOMAIN,
    });

    delete user.password;
    res.status(201).json({
      accessToken,
      user,
    });
  } catch (error) {
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

    const accessToken = generateTokens.accessToken(user.id, user.isAdmin);
    const refreshToken = generateTokens.refreshToken(user.id, user.isAdmin);

    if (!accessToken) return res.status(409).json('No access token');
    if (!refreshToken) return res.status(409).json('No refresh token');

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * REFRESH_TOKEN_LIFE_TIME,
      secure: true,
      sameSite: 'none',
      // domain: process.env.COOKIES_DOMAIN,
    });

    delete user.password;
    res.status(201).json({
      accessToken,
      user,
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
async function getUserById(id) {
  try {
    const [user] = await db.query('SELECT * From Users WHERE id=?', [id]);
    return user[0];
  } catch (error) {
    return error;
  }
}
export const refreshToken = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const refreshToken = cookies?.refreshToken?.split(' ')[1];

  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: 'no refresh token. please login again' });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'forbidden' });
    }
    const user = await getUserById(decoded?.id);
    if (!user) return res.status(401).json({ message: 'user not found' });
    const accessToken = generateTokens.accessToken(decoded.id, decoded.isAdmin);
    res.json({ accessToken });
  });
};

export const privateRoutes = async (req, res) => {
  let authHeader = req.headers?.authorization || req.headers?.Authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  let accessToken = authHeader.split(' ')[1];
  try {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN);

    res.status(200).json({ message: 'succeeded' });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
