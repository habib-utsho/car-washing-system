"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotRouter = void 0;
const express_1 = require("express");
const slot_controller_1 = require("./slot.controller");
const router = (0, express_1.Router)();
exports.slotRouter = router;
router.get('/availability', slot_controller_1.slotsControllers.getAvailableSlots);
