"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const service_model_1 = __importDefault(require("../service/service.model"));
const slot_model_1 = __importDefault(require("../slot/slot.model"));
const booking_model_1 = __importDefault(require("./booking.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../user/user.model"));
const createBooking = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = payload || {}, { serviceId, slotId } = _a, restBookingProps = __rest(_a, ["serviceId", "slotId"]);
    const isExistService = yield service_model_1.default.findById(serviceId);
    const isExistSlot = yield slot_model_1.default.findById(slotId);
    const isExistUser = yield user_model_1.default.findOne({ email });
    if (!isExistUser) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User is not found!');
    }
    if (!isExistService || (isExistService === null || isExistService === void 0 ? void 0 : isExistService.isDeleted)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Service is not found!');
    }
    if (!isExistSlot) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Slot is not found!');
    }
    if (isExistSlot.isBooked == 'booked') {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Slot is already booked!');
    }
    if (isExistSlot.service != serviceId) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Service is not found in slot!');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        isExistSlot.isBooked = 'booked';
        yield isExistSlot.save({ session });
        const booking = yield booking_model_1.default.create([
            Object.assign({ service: serviceId, slot: slotId, customer: isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser._id }, restBookingProps),
        ], { session });
        if (!(booking === null || booking === void 0 ? void 0 : booking.length)) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to booking!');
        }
        yield session.commitTransaction();
        const result = yield booking_model_1.default.findById(booking[0]._id)
            .populate('service')
            .populate('slot'); //TODO: need to add customer populate
        return result;
    }
    catch (e) {
        yield session.abortTransaction();
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, e.message);
    }
    finally {
        yield session.endSession();
    }
});
const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.find({})
        .populate('service')
        .populate('customer')
        .populate('slot');
    return result;
});
const getMyBookings = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Need to find my bookings using token
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User is not found!');
    }
    const result = yield booking_model_1.default.find({ customer: user })
        .populate('service')
        .populate('customer')
        .populate('slot');
    return result;
});
exports.BookingServices = {
    createBooking,
    getAllBookings,
    getMyBookings,
};
