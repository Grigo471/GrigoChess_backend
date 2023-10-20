import { UserModel } from "../models/userModel";
import bcrypt from 'bcrypt';
import tokenService from "./tokenService";
import { ApiError } from "../exceptions/apiError";

class UserService {

    async registration(username: string, password: string){
        const candidate = await UserModel.findOne({ username });
        if (candidate) {
            throw ApiError.BadRequestError(`User ${username} already registered`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await UserModel.create({username, password: hashPassword});

        const userDto = {
            username: user.username,
            _id: user._id,
        }

        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto._id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async login(username: string, password: string) {
        const user = await UserModel.findOne({ username });
        if (!user) {
            throw ApiError.BadRequestError(`User ${username} not found`)
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            throw ApiError.BadRequestError('Wrong password');
        }
        const userDto = {
            username: user.username,
            _id: user._id,
        }
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto._id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken: string) {
        const token = await tokenService.removeToken(refreshToken)
        return token;
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnathoizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const DBtoken = await tokenService.findToken(refreshToken);

        if (!userData || !DBtoken) {
            throw ApiError.UnathoizedError();
        }

        const user = await UserModel.findById(userData._id);

        if (!user) {
            throw ApiError.BadRequestError('User not found in database');
        }
        
        const userDto = {
            username: user.username,
            _id: user._id,
        }
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto._id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers() {
        const users = await UserModel.find();
        return users;
    }
}

export default new UserService();