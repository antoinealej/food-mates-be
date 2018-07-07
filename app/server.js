import Server from 'alcwa_base_server';
import routes from './routes/routes';
import config from './config';

const server = new Server({
  port: config.port,
  routes,
  name: 'food-mates-be'
});

export function start() {
  server.start();
}