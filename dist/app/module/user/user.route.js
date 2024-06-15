"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const user_validate_1 = require("./user.validate");
const router = (0, express_1.Router)();
exports.userRouter = router;
router.post('/signup', (0, zodValidateHandler_1.default)(user_validate_1.userZodSchema.createUserZodSchema), user_controller_1.userControllers.createUser);
router.post('/login', (0, zodValidateHandler_1.default)(user_validate_1.userZodSchema.signinUserZodSchema), user_controller_1.userControllers.signinUser);
router.get('/', user_controller_1.userControllers.getAllUser);
