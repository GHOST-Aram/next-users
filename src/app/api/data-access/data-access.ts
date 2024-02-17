import { UserModel, User } from "./model";

export class DataAccess{
    public model: UserModel
    constructor (model: UserModel){
        this.model = model
    }

    public createNew = async(data: User) =>{
        const user = await this.model.create(data)
        
        return {id: user.id, name: user.name, email:user.email }
    }
}