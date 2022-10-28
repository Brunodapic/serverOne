import axios from "axios";
import { NextFunction, Response } from "express";
import { HttpException } from "node-exceptions";
import { Pool } from "pg";

const adminMiddleware = async (req: any, res: Response, next: NextFunction) => {
  const pool = new Pool({
    user: "web2db_yg2d_user",
    host: "dpg-cd4l29qrrk02t5fabg8g-a.frankfurt-postgres.render.com",
    database: "web2db_yg2d",
    password: "OAwjGQgmQBdnik9qejHiP7EMttUueP3H",
    port: 5432,
    ssl: true,
  });
  try {
    const accToken = req.headers.authorization.split(" ")[1];
    const info = await axios.get(
      "https://dev-l3j432vbb1glmkjp.us.auth0.com/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      }
    );
    const user = info.data;
    console.log(user);

    const sql ="SELECT * FROM user_table where user_table.email = '" + user.email + "'";
    console.log(sql);
    const results = await pool.query(sql);
    const role=results.rows[0].user_role
    console.log(role)
    if(role=='admin'){
        next()
    }

    //KAKO PROVJERAVAM SAMO KOMENTARE PRETRAŽUJEM SQL BAZU DALI IMA KOMENTAR S TIM ID-OM 
    //ALI DA JU JE STVORIO EMAIL IZ TOKENA
    // u svim ostalim slucajevima je error
    const sql2 ="SELECT * FROM comments where user_email = '" + user.email + "' and comment_id = '"+req.params.id+"'";
    console.log(sql2);
    const results2 = await pool.query(sql2);
    console.log(results2.rows)
    if(results2.rows.length > 0){
        next()
    }
   
  } catch (error) {
    console.log(error)
  }

};

export default adminMiddleware;
