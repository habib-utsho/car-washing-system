import { Router } from 'express'
import { bookingControllers } from './booking.controller'

const router = Router()
const router2 = Router()

router.post('/', bookingControllers.createBooking) //TODO: only accessible by user
router.get('/', bookingControllers.getAllBookings) //TODO: only accessible by admin
router2.get('/my-bookings', bookingControllers.getMyBookings) //TODO: only accessible by user

export { router as bookingRouter, router2 as myBookingRouter }
