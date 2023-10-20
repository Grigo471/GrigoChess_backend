import { type ValidationError } from 'express-validator';

export class ApiError extends Error {
    status: number;
    errors: string[] | ValidationError[];

    constructor(status: number, message: string, errors: string[] | ValidationError[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnathoizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static BadRequestError(message: string, errors: string[] | ValidationError[] = []) {
        return new ApiError(400, message, errors);
    }

}