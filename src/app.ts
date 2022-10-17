import express from "express";
import cors from 'cors';

import routes from "./routes";
import { Routes } from "./interfaces/routes.interface";

class App {
  public server;
  public app: express.Application;


  constructor(routes: Routes[]) {
    this.server = express();

    this.middlewares();
    this.initializeRoutes(routes);
  }

  middlewares() {
    this.app.use(cors());
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
