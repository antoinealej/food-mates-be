import jwt from 'jsonwebtoken';

export function tokenConstruct(data) {
  return jwt.sign(data, 'secret', { expiresIn: '24h' });
}

export function tokenVerify(token) {
  return jwt.verify(token, 'secret');
}

