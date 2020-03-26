import { BackendApplication } from './application';
import { ApplicationConfig } from '@loopback/core';
import express, { Request, Response } from 'express';
import http from 'http';
import path from 'path';
import pEvent from 'p-event';

// Virgil SDK
import { requireAuthHeader } from './api/userValidation';
import { virgilJwt } from './api/virgilJwt';
import { authenticate } from './api/authenticate';

/**
 * This class will serve as a express server
 */
export class ExpressServer {
  private app: express.Application;
  public readonly lbApp: BackendApplication;
  private server?: http.Server;

  constructor(options: ApplicationConfig = {}) {
    this.app = express(); // define express server
    this.lbApp = new BackendApplication(options); // initialize loopback app
    // able to use req body
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

    // register loopback app on /api route
    this.app.use('/api', this.lbApp.requestHandler);

    //CUSTOM EXPRESS ROUTES
    this.app.get('/', function (_req: Request, res: Response) {
      res.sendFile(path.resolve('public/express.html'));
    });
    this.app.post('/authenticate', authenticate);
    this.app.get('/virgil-jwt', requireAuthHeader, virgilJwt); // generate token for user
  }

  async boot() {
    await this.lbApp.boot();
  }

  public async start() {
    await this.lbApp.start();
    const port = this.lbApp.restServer.config.port || 3000;
    const host = this.lbApp.restServer.config.host ?? 'localhost';
    this.server = this.app.listen(port, host);
    await pEvent(this.server, 'listening');
  }

  public async stop() {
    if (!this.server) return;
    await this.lbApp.stop();
    this.server.close();
    this.server = undefined;
  }
}
