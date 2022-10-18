import { Router } from "express";

import authMiddleware from "./middlewares/auth.middleware"
const routes = Router();

routes.get("/",authMiddleware ,(req, res) => {
  return res.json({ message: "Hello World" });
});

export default routes;
