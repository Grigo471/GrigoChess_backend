import jwt, { Secret } from 'jsonwebtoken'
import { TokenModel } from '../models/tokenModel';
import { Types } from 'mongoose';

export interface TokenServiceResult {
    accessToken: string;
    refreshToken: string;
}

export interface TokenPayload {
    username: string;
    _id: Types.ObjectId;
}

class TokenService {

    generateTokens(payload: TokenPayload): TokenServiceResult {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as Secret, { expiresIn: '1h' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as Secret, { expiresIn: '30d' })

        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(accessToken: string) {
        try {
            const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as Secret);
            return userData as TokenPayload;
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(refreshToken: string) {
        try {
            const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as Secret);
            return userData as TokenPayload;
        } catch (error) {
            return null;
        }
    }

    async saveToken(userId: Types.ObjectId, refreshToken: string) {
        const tokenData = await TokenModel.findOne({ user: userId });

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await TokenModel.create({ user: userId, refreshToken });
        return token;
    }

    async removeToken(refreshToken: string) {
        const token = await TokenModel.deleteOne({ refreshToken });
        return token;
    }

    async findToken(refreshToken: string) {
        const token = await TokenModel.findOne({ refreshToken });
        return token;
    }
}

export default new TokenService();