import { Router } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import randomstring from "randomstring";
import { expressjwt, Request as JWTRequest } from "express-jwt";
import { GetVerificationKey } from "jwks-rsa";
import jwksRsa from "jwks-rsa";
import axios from "axios";
import adminMiddleware from "./middlewares/admin.middleware";
import authMiddleware from "./middlewares/auth.middleware";

dotenv.config();
const routes = Router();

/*const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-l3j432vbb1glmkjp.us.auth0.com/.well-known/jwks.json",
  }) as GetVerificationKey,

  audience: "http://localhost:3000/",
  issuer: "https://dev-l3j432vbb1glmkjp.us.auth0.com/",
  algorithms: ["RS256"],
});

// auth router attaches /login, /logout, and /callback routes to the baseURL

// req.isAuthenticated is provided from the auth router

const pool = new Pool({
  user: "web2db_yg2d_user",
  host: "dpg-cd4l29qrrk02t5fabg8g-a.frankfurt-postgres.render.com",
  database: "web2db_yg2d",
  password: "OAwjGQgmQBdnik9qejHiP7EMttUueP3H",
  port: 5432,
  ssl: true,
});
*/

routes.get("/", async (req, res) => {
  //odgovara nakon 30 sekundi
  console.log(req.body.title);
  setTimeout(() => {
    sendPushNotifications("test1");
    return res.json({ message: "Hello World" });
  }, 10000);
});

const fs = require("fs");
const webpush = require("web-push");

// Umjesto baze podataka, čuvam pretplate u datoteci:
let subscriptions: any[] = [];
const SUBS_FILENAME = "subscriptions.json";
try {
  subscriptions = JSON.parse(fs.readFileSync(SUBS_FILENAME));
} catch (error) {
  console.error(error);
}

routes.post("/not", (req, res) => {
  console.log(req.body);
  let sub = req.body.sub;
  subscriptions.push({ sub });
  fs.writeFileSync(SUBS_FILENAME, JSON.stringify(subscriptions));
  res.json({
    success: true,
  });
});

async function sendPushNotifications(snapTitle: string) {
  webpush.setVapidDetails(
    "mailto:brunodapic@gmail.com",
    "BP4a6E2dCioFYOLX87ATPOP3aJQ7g3h0WE-ItH2EaJhS6BB5nx_UBopXltjfotFp5NcFinHDh1sroZ-1erHn6m4",
    "49xhtK5qD5QNIcDMhoN9k9ZFoFuEKbNXGX_c-6x2bns"
  );
  subscriptions.forEach(async (sub) => {
    try {
      console.log("Sending notif to", sub.sub);
      await webpush.sendNotification(
        sub.sub,
        JSON.stringify({
          title: "TEST1111111111TESET!",
          body: "Somebody just snaped a new photo:",
          redirectUrl: "/index.html",
        })
      );
    } catch (error) {
      console.error(error);
    }
  });
}

//ZA SVE
/*
routes.get("/db", async (req, res) => {
  console.log("yes db");
  const results = await pool.query(
    "SELECT * FROM public.team ORDER BY points,diff ASC"
  );
  console.log(results.rows);
  return res.json({ data: results.rows });
});

//odlucio sam slati sva kola, jer ih je malo a server je spor i zna ne raditi
routes.get("/db/kolo/", async (req, res) => {
  const results = await pool.query("SELECT * FROM public.kolo");
  console.log(results.rows);
  return res.json({ data: results.rows });
});

routes.get("/db/game/:id", async (req, res) => {
  console.log("yes db");
  const results = await pool.query(
    "SELECT * FROM public.games where games.game_id='" + req.params.id + "' "
  );
  console.log(results.rows);
  return res.json({ data: results.rows });
});

routes.put("/db/game/:id", checkJwt ,adminMiddleware,async (req, res) => {
  console.log("yes db");
  const results = await pool.query(
    "UPDATE games SET team1_score = " +
      req.body.team1_score +
      " , team2_score= " +
      req.body.team2_score +
      "WHERE game_id = '" +
      req.params.id +
      "'"
  );
  console.log(results.rows);
  return res.json({ data: results.rows });
});

routes.get("/db/games", async (req, res) => {
  console.log("yes db");
  const results = await pool.query(
    "SELECT * FROM public.kolo JOIN games on kolo.id_kolo::INTEGER=games.week ORDER BY kolo.id_kolo::INTEGER "
  );
  console.log(results.rows);
  return res.json({ data: results.rows });
});

//KOMENTARI

routes.get("/db/comment/:week", async (req, res) => {
  console.log("yes db");

  const results = await pool.query(
    "SELECT * FROM public.comments where comments.week='" +
      req.params.week +
      "' "
  );
  console.log(results.rows);
  return res.json({ data: results.rows });
});

routes.post("/db/comment",checkJwt ,authMiddleware, async (req, res) => {
  console.log("yes db");
  const id = randomstring.generate(20);
  const sql =
    "INSERT INTO comments VALUES ('" +
    id +
    "', '" +
    req.body.email +
    "' , '" +
    req.body.comment +
    "', '" +
    req.body.week +
    "', '" +
    req.body.date.substring(0, 10) +
    "' )";
  console.log(sql);
  const results = await pool.query(sql);
  console.log(results);
  return res.json({ data: results });
});

routes.put("/db/comment/:id",checkJwt ,adminMiddleware, async (req, res) => {
  console.log("yes db");
  const sql =
    "UPDATE comments SET comment = '" +
    req.body.comment +
    "' WHERE comment_id = '" +
    req.body.comment_id +
    "'";
  console.log(sql);
  const results = await pool.query(sql);
  console.log(results);
  return res.json({ data: results });
});

routes.delete("/db/comment/:id",checkJwt ,adminMiddleware, async (req, res) => {
  console.log("yes db");
  console.log(req.body);
  const sql = "DELETE FROM comments WHERE comment_id = '" + req.params.id + "'";
  console.log(sql);
  const results = await pool.query(sql);
  console.log(results);
  return res.json({ data: results });
});
*/
export default routes;
