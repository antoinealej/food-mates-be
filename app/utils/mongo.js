import { mongoCollection } from 'alcwa_base_server';

export function itemCollection() {
  return mongoCollection('item');
}

export function categoryCollection() {
  return mongoCollection('category');
}

export function foodOriginCollection() {
  return mongoCollection('foodOrigin');
}

export function userCollection() {
  return mongoCollection('user');
}
