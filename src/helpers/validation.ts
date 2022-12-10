import {ApiError} from "../error/api.error";
import {NextFunction, Request, Response} from "express";
import {UserToken} from "./token.helper";
import jwt from "jsonwebtoken";

export const validatePassword = (value: string) => {
    const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const uppercaseChars = /[A-Z]/;
    const lowercaseChars = /[a-z]/;
    const numericChars = /\d/;
    if (value.length < 8) {
        throw ApiError.badRequest('length of password more than 8');
    }
    if (!lowercaseChars.test(value)) {
        throw ApiError.badRequest('should contain lowercase char');
    }
    if (!uppercaseChars.test(value)) {
        throw ApiError.badRequest('should contain uppercase char');
    }
    if (!numericChars.test(value)) {
        throw ApiError.badRequest('should contain numeric char');
    }
    if (!specialChars.test(value)) {
        throw ApiError.badRequest('should contain special char');
    }
}