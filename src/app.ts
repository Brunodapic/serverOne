import express from "express";
import cors from 'cors';

import routes from "./routes";
import { Routes } from "./interfaces/routes.interface";

class App {
  public server;
  public app: express.Application;
  public port: string | number;


  constructor(routes: Routes[]) {
    this.server = express();
    this.port =  3000;

    this.middlewares();
    this.initializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port);
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }
}

export default App;
