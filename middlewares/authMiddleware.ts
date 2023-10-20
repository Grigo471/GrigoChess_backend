import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/apiError";
import tokenService from "../services/tokenService";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnathoizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnathoizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnathoizedError());
        }
        next();
    } catch (error) {
        
    }
}