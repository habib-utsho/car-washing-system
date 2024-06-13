"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const errHandler_1 = require("./app/middleware/errHandler");
const app = (0, express_1.default)();
// Parser
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/v1/');
app.get('/', (req, res) => {
    res.status(200).send({ success: true, message: 'This is test route', data: null });
});
// err handler middleware 
app.use(errHandler_1.notFoundErrHandler);
app.use(errHandler_1.globalErrHandler);
exports.default = app;
