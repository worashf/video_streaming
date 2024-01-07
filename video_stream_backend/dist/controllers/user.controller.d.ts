import { JwtService } from "@nestjs/jwt";
import { User } from "src/models/user.schema";
import { UserService } from "src/services/user.service";
export declare class UserController {
    private readonly userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    signup(response: any, user: User): Promise<any>;
    signin(response: any, user: User): Promise<any>;
}
