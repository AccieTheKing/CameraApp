import { BackendApplication } from './application';
import { ApplicationConfig } from '@loopback/core';
import http from 'http';
import express, { Request, Response } from 'express';
import path from 'path';

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

    this.app.use('/api', this.lbApp.requestHandler);

    // custom express routes
    this.app.get('/', function (req: Request, res: Response) {
      res.sendFile(path.resolve('public/express.html'));
    });
    this.app.get('/hello', function (req: Request, res: Response) {
      res.send('Hello world!');
    });
  }

  async boot() {
    await this.lbApp.boot();
  }

  public async start() {
    await this.lbApp.start();
    const port = this.lbApp.restServer.config.port || 3000;
    const host = this.lbApp.restServer.config.host ?? '127.0.0.1';
    this.server = this.app.listen(port, host);
  }

  public async stop() {
    if (!this.server) return;
    await this.lbApp.stop();
    this.server.close();
    this.server = undefined;
  }
}
