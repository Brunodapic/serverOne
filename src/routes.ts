import { Router } from "express";
import authMiddleware from "./middlewares/auth.middleware";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
const routes = Router();

const pool = new Pool({
  user: "web2db_yg2d_user",
  host: "dpg-cd4l29qrrk02t5fabg8g-a.frankfurt-postgres.render.com",
  database: "web2db_yg2d",
  password: "OAwjGQgmQBdnik9qejHiP7EMttUueP3H",
  port: 5432,
  ssl: true
});



routes.get("/", authMiddleware, (req, res) => {
  return res.json({ message: "Hello World" });
});

routes.get("/db", async (req, res) => {
  console.log("yes db")
  const results = await pool.query("SELECT * FROM public.user_table");
  console.log( results)
  return res.json({ data: results });

});


routes.post("/db", async (req, res) => {
  console.log("yes db")
  console.log("INSERT INTO user_table VALUES ("+req.body.email+","+req.body.role+");")
  const results = await pool.query("INSERT INTO user_table VALUES ('"+req.body.email+"','"+req.body.role+"');");
  console.log( results)
  return res.json({ data: results });

});

export default routes;
