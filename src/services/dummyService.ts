import { Request, Response } from "express";


export function dummy(req:Request,res:Response):void {
    console.log(`Dummy Function called at ${req.url}`)
    res.send(`Dummy Function Response for ${req.url}`)
}