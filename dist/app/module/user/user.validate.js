"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userZodSchema = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    password: zod_1.z.string(),
    phone: zod_1.z.string(),
    role: zod_1.z.enum(['admin', 'user']),
    address: zod_1.z.string(),
});
const signinUserZodSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.userZodSchema = {
    createUserZodSchema,
    signinUserZodSchema
};
