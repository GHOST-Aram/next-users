import { HydratedDocument, Model, Schema, model, models } from "mongoose"
import { compare, hash } from 'bcrypt'


export interface User{
    name: string
    email: string
    password: string
}

interface UserMethods{
    hasValidPassword: (password: string) => Promise<boolean>
}
export type UserModel = Model<User>

const userSchema = new Schema<User, UserModel>({
    name: String,
    email: String,
    password:String
})

userSchema.pre('save', async function(next){
    const hashedPassword = await hash(this.password, 10)
    this.password = hashedPassword

    next()
})

userSchema.method('hasValidPassword', async function(password: string): Promise<boolean>{
    const isValidPassword = await compare(password, this.password)

    return isValidPassword
})

export type HydratedUserModel = HydratedDocument<User>

export const User = models.User ? models.User : model<User,UserModel>('User', userSchema)