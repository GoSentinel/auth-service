import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorReply, RedisClientType} from 'redis';
import { getClient } from '../db/redisCache';

interface DecodedToken {
    sub: string;
}

const redis:RedisClientType = getClient();

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
        const token: string = req.headers.authorization?.split(' ')[1] ?? "nullToken";

        if(token === "nullToken"){
            return res.status(400).json({
                status: false,
                message: "Bad Request"
            })
        }

        const decoded: DecodedToken = jwt.verify(token, process.env.JWT_SECRET ?? "") as DecodedToken;

        redis.get('BL_' + decoded.sub.toString()).then((value:string|null)=>{
            if(value === token) return res.status(401).json({status: false, message: "Blacklisted token."});
            next();
        },(err:ErrorReply)=> {throw err;});
    } catch (error) {
        return res.status(401).json({ status: false, message: "Your session is not valid.", data: error });
    }
}

export function verifyRefreshToken(req: Request, res: Response, next: NextFunction) {
    const token: string | null = req.body.token;

    if(token === null){
        return res.status(400).json({
            status: false,
            message: "Bad Request"
        })
    }

    if (token === null) return res.status(401).json({ status: false, message: "Invalid request." });
    try {
        const decoded: DecodedToken = jwt.verify(token, process.env.JWT_REFRESH_SECRET ?? "") as DecodedToken;

        redis.get(`BL_${decoded.toString()}`).then((value:string|null)=>{
            if(value === token) return res.status(401).json({status: false, message: "blacklisted token."});
            next();
        },(error:ErrorReply)=>{
            throw error;
        })
    } catch (error) {
        return res.status(401).json({ status: true, message: "Your session is not valid.", data: error });
    }
}
