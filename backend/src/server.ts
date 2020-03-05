import { BackendApplication } from './application';
import { ApplicationConfig } from '@loopback/core';
import express, { Request, Response } from 'express';
import http from 'http';
import path from 'path';
import pEvent from 'p-event';

// Virgil SDK
import { virgilJwt } from './api/virgilJwt';
import { authenticate } from './api/authenticate';

/**
 * This class will serve as a express server
 */
export class ExpressServer {
  private app: express.Application;
  private lbApp: BackendApplication;
  private server?: http.Server;

  constructor(options: ApplicationConfig = {}) {
    this.app = express(); // define express server
    this.lbApp = new BackendApplication(); // initialize loopback app

    // register loopback app on /api route
    this.app.use('/api', this.lbApp.requestHandler);

    //CUSTOM EXPRESS ROUTES
    this.app.get('/', function (_req: Request, res: Response) {
      res.sendFile(path.resolve('public/express.html'));
    });

    this.app.get('/virgil-jwt', virgilJwt); // generate token for user
    // this.app.post('/authenticate', authenticate); //
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
