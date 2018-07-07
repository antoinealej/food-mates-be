import bcrypt from 'bcrypt';

export function hash(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export function compare(password, hashPassword) {
  return bcrypt.compare(password, hashPassword);
}
