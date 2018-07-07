import { getConfig } from 'alcwa_base_server';

export default {
  port: getConfig('PORT'),
  mongoURL: getConfig('MONGO_URL')
};