import express from "express";
import cors from 'cors';
import routes from "./routes";
/*const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'https://localhost:3000',
  clientID: 'ZAB2YEr19vPXJW1utRUwKRMSZJUMzik6',
  issuerBaseURL: 'https://dev-l3j432vbb1glmkjp.us.auth0.com'
};*/

class App {
  public server;

  constructor() {
    this.server = express();
    this.server.use(cors());
    //this.server.use(auth(config));

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
