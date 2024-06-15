"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, statusCode, format) => {
    var _a;
    res.status(statusCode).send({
        success: format === null || format === void 0 ? void 0 : format.success,
        statusCode,
        message: ((_a = format === null || format === void 0 ? void 0 : format.data) === null || _a === void 0 ? void 0 : _a.length) === 0 ? "No Data Found" : format === null || format === void 0 ? void 0 : format.message,
        data: (format === null || format === void 0 ? void 0 : format.data) || null,
    });
};
exports.default = sendResponse;
