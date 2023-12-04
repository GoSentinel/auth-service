import cors, { CorsOptions } from "cors";
import "dotenv/config";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import { connectRedis } from "./db/redisCache";


const server:Express = express();
const port:string|number = process.env.PORT ?? 6000;

/* MIDDLEWARES START */
server.use(morgan("tiny"));

server.use(cors({
    origin:`http://localhost:${port}`,
    credentials:true,
}as CorsOptions))

server.use(express.json());
/* MIDDLEWARES END */

/* ROUTERS START */

// *TEST Route
server.get("/",(_req:Request,res:Response):void=>{
    res.send("HELLO! WELCOME TO AUTH-SERVICE @ NavJeevan 2.0")
})

/* ROUTERS END */

connectRedis();


server.listen(port,():void=>{
    console.log(`⚡️[auth-server]: Auth-Server is running at http://localhost:${port}`);
})