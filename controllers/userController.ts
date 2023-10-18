import { NextFunction, Request, Response } from "express";

export class UserController {

    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (error) {

        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (error) {

        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (error) {

        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(['123', '456'])
        } catch (error) {

        }
    }
}
