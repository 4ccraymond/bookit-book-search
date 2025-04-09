import jwt from 'jsonwebtoken';
import { Request } from 'express';

const secret = process.env.JWT_SECRET || 'mysecret';
const expiration = '2h';

export function signToken({ username, email, _id }) {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

export function getUserFromToken(req: Request) {
  let token = req.body?.token || req.query?.token || req.headers.authorization;

  if (token?.startsWith('Bearer ')) {
    token = token.slice(7).trim();
  }

  if (!token) return null;

  try {
    const { data } = jwt.verify(token, secret) as { data: any };
    return data;
  } catch (err) {
    console.log('Invalid token');
    return null;
  }
}
