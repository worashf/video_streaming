import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose'
import { JwtService } from "@nestjs/jwt";
import *as bcrypt from 'bcrypt'
import { User, UserDocument } from '../models/user.schema'

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,

    ) { }
    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt()
        return bcrypt.hash(password, salt)

    }

    async signup(user: User): Promise<User> {
        const hashedPassword = await this.hashPassword(user.password)
        const userReq = {
            fullname: user.fullname,
            email: user.email,
            password: hashedPassword
        }
        const newuser = new this.userModel(userReq)
        return newuser.save()
    }


    async signin(user: User, jwt: JwtService): Promise<any> {
        try {
            const foundUser = await this.userModel.findOne({ email: user.email })

            if (foundUser && (await bcrypt.compare(user.password, foundUser.password))) {
                const payload = { email: user.email };
                const token = jwt.sign(payload)
                return { token }
            }
            throw new HttpException("Incorrect email or password", HttpStatus.UNAUTHORIZED)
        }
        catch (error) {
            if (error instanceof HttpException) {
                throw error
            }
            throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR)

        }
    }
   async  getOne(email:String):Promise<User | null>{
    return  this.userModel.findOne({email}).exec()
   }
    }

