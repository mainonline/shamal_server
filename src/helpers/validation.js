"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = void 0;
const api_error_1 = require("../error/api.error");
const validatePassword = (value) => {
    const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const uppercaseChars = /[A-Z]/;
    const lowercaseChars = /[a-z]/;
    const numericChars = /\d/;
    if (value.length < 8) {
        throw api_error_1.ApiError.badRequest('length of password more than 8');
    }
    if (!lowercaseChars.test(value)) {
        throw api_error_1.ApiError.badRequest('should contain lowercase char');
    }
    if (!uppercaseChars.test(value)) {
        throw api_error_1.ApiError.badRequest('should contain uppercase char');
    }
    if (!numericChars.test(value)) {
        throw api_error_1.ApiError.badRequest('should contain numeric char');
    }
    if (!specialChars.test(value)) {
        throw api_error_1.ApiError.badRequest('should contain special char');
    }
};
exports.validatePassword = validatePassword;
