import jwt from 'jsonwebtoken';

export function tokenConstruct(data) {
  return jwt.sign(data, 'secret', { expiresIn: '24h' });
}