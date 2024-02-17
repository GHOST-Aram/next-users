import { NextRequest, NextResponse } from "next/server"
import { DataAccess } from "../data-access/data-access"
import { User } from "../data-access/model"

export class Controller{
    private dataAccess: DataAccess

    constructor(dataAccess: DataAccess){
        this.dataAccess = dataAccess
    }

    public createUser = async(request: NextRequest) =>{
        const userData: User = await request.json()

        const newUser = await this.dataAccess.createNew(userData)

        return new Response(JSON.stringify(newUser), {
            headers:{
                "Content-Type": 'application/json'
            }, 
            status: 201
        })
    }
}