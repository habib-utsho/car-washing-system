"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_route_1 = require("../module/service/service.route");
const slot_route_1 = require("../module/slot/slot.route");
const booking_route_1 = require("../module/booking/booking.route");
const user_route_1 = require("../module/user/user.route");
const router = (0, express_1.Router)();
const routes = [
    {
        path: '/services',
        route: service_route_1.serviceRouter,
    },
    {
        path: '/slots',
        route: slot_route_1.slotRouter,
    },
    {
        path: '/bookings',
        route: booking_route_1.bookingRouter
    },
    {
        path: '/',
        route: booking_route_1.myBookingRouter
    },
    {
        path: '/auth',
        route: user_route_1.userRouter
    },
];
routes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
