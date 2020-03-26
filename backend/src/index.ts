import { BackendApplication } from './application';
import { ExpressServer } from './server';
import { ApplicationConfig } from '@loopback/core';
import * as dotenv from 'dotenv';

export { ExpressServer, BackendApplication };
export async function main(options: ApplicationConfig = {}) {
  dotenv.config(); // for making use of .env files
  const server = new ExpressServer(options);
  await server.boot();
  await server.start();
  console.log(`Server is running at http://127.0.0.1:3000`);
}
