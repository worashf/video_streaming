"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_schema_1 = require("../models/user.schema");
const user_service_1 = require("../services/user.service");
let UserController = class UserController {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async signup(response, user) {
        const newUser = await this.userService.signup(user);
        return response.status(common_1.HttpStatus.CREATED).json({ newUser });
    }
    async signin(response, user) {
        const token = await this.userService.signin(user, this.jwtService);
        return response.status(common_1.HttpStatus.OK).json(token);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)("/signin"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signin", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("/api/v1/users"),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], UserController);
//# sourceMappingURL=user.controller.js.map