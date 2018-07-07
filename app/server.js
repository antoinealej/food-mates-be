import Server from 'alcwa_base_server';
import routes from './routes/routes';
import config from './config';

const { mongo } = config;

const server = new Server({
  port: config.port,
  routes,
  name: 'food-mates-be',
  mongo
});

export function start() {
  server.start();
}