import mongoose from "mongoose"

export interface IRole{
    _id:string,
    name:string
}
export const Roles = {
    admin:new mongoose.mongo.ObjectId("6454a474cb8cc5251b249405"),
    player:new mongoose.mongo.ObjectId("6454a497cb8cc5251b249408"),
    moderator:new mongoose.mongo.ObjectId("6454a4b2cb8cc5251b24940b")
}