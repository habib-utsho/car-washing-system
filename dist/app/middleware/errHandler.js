"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrHandler = exports.notFoundErrHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const notFoundErrHandler = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res
        .status(http_status_codes_1.StatusCodes.NOT_FOUND)
        .send({ success: false, message: error === null || error === void 0 ? void 0 : error.message, error: error });
};
exports.notFoundErrHandler = notFoundErrHandler;
const globalErrHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Internal Server Error';
    const errSources = [
        {
            path: '',
            message: 'Internal Server Error',
        },
    ];
    res.status(statusCode).send({
        success: false,
        message,
        errSources,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err === null || err === void 0 ? void 0 : err.stack,
    });
};
exports.globalErrHandler = globalErrHandler;
