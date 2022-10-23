import { Router } from "express";
import authMiddleware from "./middlewares/auth.middleware";
import { Pool } from "pg";
import dotenv from "dotenv";
import randomstring from "randomstring";

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

//ZA SVE
routes.get("/db", async (req, res) => {
  console.log("yes db")
  const results = await pool.query("SELECT * FROM public.team");
  console.log( results.rows)
  return res.json({ data: results.rows });

});

//odlucio sam slati sva kola, jer ih je malo a server je spor i zna ne raditi
routes.get("/db/kolo/", async (req, res) => {
  const results = await pool.query("SELECT * FROM public.kolo");
  console.log( results.rows)
  return res.json({ data: results.rows });

});

routes.get("/db/game/:id", async (req, res) => {
  console.log("yes db")
  const results = await pool.query("SELECT * FROM public.games where games.game_id='"+req.params.id+"' ");
  const dataSql = results.rows
  console.log( results.rows)
  return res.json({ data: results.rows });

});

//KOMENTARI

routes.get("/db/comment/:week", async (req, res) => {
  console.log("yes db")

  const results = await pool.query("SELECT * FROM public.comments where comments.week='"+req.params.week+"' ");
  console.log( results.rows)
  return res.json({ data: results.rows });

});

routes.post("/db/comment", async (req, res) => {
  console.log("yes db")
  const id = randomstring.generate(20);
  const results = await pool.query("INSERT INTO comments VALUES ('"+id+"', '"+req.body.email+"' , '"+req.body.comment+"', '"+req.body.week+"' )");
  console.log( results)
  return res.json({ data: results });

});

routes.put("/db/comment/:id", async (req, res) => {
  console.log("yes db")
  const sql="UPDATE comments SET comment = '"+req.body.comment+"' WHERE comment_id = '"+req.body.comment_id+"'"
  console.log(sql)
  const results = await pool.query(sql);
  console.log( results)
  return res.json({ data: results });

});

routes.delete("/db/comment/:id", async (req, res) => {
  console.log("yes db")
  const sql = "DELETE FROM comments WHERE comment_id = '"+req.body.comment_id+"'"
  console.log(sql)
  const results = await pool.query(sql);
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
