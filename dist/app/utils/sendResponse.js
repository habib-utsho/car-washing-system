"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const sendResponse = (res, statusCode, format) => {
    var _a, _b, _c;
    res.status(statusCode).send({
        success: ((_a = format === null || format === void 0 ? void 0 : format.data) === null || _a === void 0 ? void 0 : _a.length) === 0 ? false : format === null || format === void 0 ? void 0 : format.success,
        statusCode: ((_b = format === null || format === void 0 ? void 0 : format.data) === null || _b === void 0 ? void 0 : _b.length) === 0 ? http_status_codes_1.StatusCodes.NOT_FOUND : statusCode,
        message: ((_c = format === null || format === void 0 ? void 0 : format.data) === null || _c === void 0 ? void 0 : _c.length) === 0 ? 'No Data Found' : format === null || format === void 0 ? void 0 : format.message,
        data: (format === null || format === void 0 ? void 0 : format.data) || null,
    });
};
exports.default = sendResponse;
