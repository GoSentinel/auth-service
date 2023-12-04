import { RedisClientType, createClient } from "redis";


const redis:RedisClientType = createClient();

export async function connectRedis(){
    await redis.connect().then(() => console.log("Redis client Connected"));
}

export function getClient():RedisClientType{
    return redis;
}