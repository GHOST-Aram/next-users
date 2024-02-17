import 'dotenv/config'
import { connectDB } from './z-library/db/db';
import { Controller } from "./controller/controller";
import { DataAccess } from "./data-access/data-access";
import { User } from "./data-access/model";
import { NextRequest } from "next/server";

const mongodbUri = process.env.MONGODB_URI

if(mongodbUri){
   (async() =>{
        try {
            await connectDB(mongodbUri)
        } catch (error) {
            console.log('DB connection failed')
        }
    }
   )()
} else{
    console.log('Mongo Db connection string not found')
}

const dataAccess = new DataAccess(User)
const controller = new Controller(dataAccess)

export const POST = async(request: NextRequest) =>{ return await controller.createUser(request)}