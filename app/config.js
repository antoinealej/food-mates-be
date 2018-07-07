import { getConfig } from 'alcwa_base_server';

export default {
  port: getConfig('PORT'),
  mongo: {
    url: getConfig('MONGO_URL')
  }
};