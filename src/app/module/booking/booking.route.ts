import { Router } from 'express'
import { bookingControllers } from './booking.controller'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { bookingZodSchema } from './booking.validate'
import auth from '../../middleware/auth'

const router = Router()
const router2 = Router()

router.post('/', auth(), zodValidateHandler(bookingZodSchema.createBookingZodSchema), bookingControllers.createBooking) //TODO: only accessible by user
router.get('/', auth(), bookingControllers.getAllBookings) //TODO: only accessible by admin
router2.get('/my-bookings', auth(), bookingControllers.getMyBookings) //TODO: only accessible by user

export { router as bookingRouter, router2 as myBookingRouter }
