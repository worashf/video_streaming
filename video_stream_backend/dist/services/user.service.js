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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const user_schema_1 = require("../models/user.schema");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
    }
    async signup(user) {
        const hashedPassword = await this.hashPassword(user.password);
        const userReq = {
            fullname: user.fullname,
            email: user.email,
            password: hashedPassword
        };
        const newuser = new this.userModel(userReq);
        return newuser.save();
    }
    async signin(user, jwt) {
        try {
            const foundUser = await this.userModel.findOne({ email: user.email });
            if (foundUser && (await bcrypt.compare(user.password, foundUser.password))) {
                const payload = { email: user.email };
                const token = jwt.sign(payload);
                return { token };
            }
            throw new common_1.HttpException("Incorrect email or password", common_1.HttpStatus.UNAUTHORIZED);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException("Internal server error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getOne(email) {
        return this.userModel.findOne({ email }).exec();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map