import express from "express";
import cors from 'cors';
import routes from "./routes";
const { auth } = require('express-openid-connect');

/*const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'ZAB2YEr19vPXJW1utRUwKRMSZJUMzik6',
  issuerBaseURL: 'https://dev-l3j432vbb1glmkjp.us.auth0.com'
};

-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQChxpdekIvwpzoX12f1zJMsREE2LF37BLn2JI043nRAMyInqlhS
Hj2TFfRqE5WTdLlhO+eVqBJr1XHF0KTrepB+Dx8QQ5DDTKdHdQ6vj4lHgML06QSS
gJhEHNdjaYZUTE0fAvoa9SPXs7bbf/+CGsMggm1UDf26tIZO6kCQ1R3nqwIDAQAB
AoGAeroj33OdFkZnBes+TPSTugNVzXk/Gs1tHlSAZmIsov+nq5vJQRL793eyYj7V
PHZSpHdDqv9EalYU59LvKk1jC2iuLu2pON+048hM28ic8Qx8LVKdJ+G1Wr+avL5I
HH7DD2yGFUckRNGg6WmgP+KDk7CY/qJtesARTiZszpEuKGECQQDg83OQTr11yJ5F
q1Gaip7rxtaZV+bkaQL/kG0k31KPHvwDHgg1yF/Ej41TIS5xL+jYI/hk4vDeubX5
rKz8cZGJAkEAuBrek+4sTuUmu7I6svhTsqW1TDD3naP7Enom5ph44h8pj7yX0B/6
B8cTIjOOZhLsQwDqPY+qYxv0DFtjv6UmkwJBAMRRUxquzUP8uLwenpIbxkQIfQLI
pxXR268D8WzLhXaoWNGzpQCjBYk6quDQxYI8iJ4RDlelgwct1fW20CVkS9kCQBEN
9CZx/srEMYVbqlJf7Kj07smDE70Xrq90f1wHLdOMnXYCO3H9NFU6HMyjSAKuqBJA
6HIRd/A8a6wlXyUmsF8CQBxt+vxdkB267y4SCGLkPkPKH/p/1fzMaKogf10vkKmI
WnzVP8YrUD6c25hx3OHYHWZdSgowyCPBJRjHnoPs+L0=
-----END RSA PRIVATE KEY-----


-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQChxpdekIvwpzoX12f1zJMsREE2
LF37BLn2JI043nRAMyInqlhSHj2TFfRqE5WTdLlhO+eVqBJr1XHF0KTrepB+Dx8Q
Q5DDTKdHdQ6vj4lHgML06QSSgJhEHNdjaYZUTE0fAvoa9SPXs7bbf/+CGsMggm1U
Df26tIZO6kCQ1R3nqwIDAQAB
-----END PUBLIC KEY-----

*/


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
