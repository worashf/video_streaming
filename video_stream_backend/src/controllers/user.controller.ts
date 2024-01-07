import { Controller, Body, Res, Post, Put, Delete,Get, HttpStatus, Req, UploadedFiles, Param } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/models/user.schema";
import { UserService } from "src/services/user.service";


@Controller("/api/v1/users")
export class  UserController{
    constructor(private  readonly userService:UserService,
        private jwtService:JwtService){}

@Post('/signup')
async signup(@Res() response, @Body() user: User){
    const newUser  = await this.userService.signup(user)
    return response.status(HttpStatus.CREATED).json({newUser})
}

@Post("/signin")
async signin(@Res() response, @Body() user: User){
    const token  = await this.userService.signin(user, this.jwtService)
    return response.status(HttpStatus.OK).json(token)
}

}