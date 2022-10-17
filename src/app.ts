import express from "express";
import { Routes } from "./interfaces/routes.interface";
import routes from "./routes";

class App {
  public app: express.Application;


  constructor(routes: Routes[]) {
    this.app = express();


    this.middlewares();
    this.initializeRoutes(routes);
  }

  public listen() {
    this.app.listen(3000);
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
  }
}

export default App;
