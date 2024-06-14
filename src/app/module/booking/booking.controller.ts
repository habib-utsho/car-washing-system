import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BookingServices } from './booking.service'

const createBooking = catchAsync(async (req, res) => {
  const booking = await BookingServices.createBooking(req.body)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Booking successful',
    data: booking,
  })
})
const getAllBookings = catchAsync(async (req, res) => {
  const bookings = await BookingServices.getAllBookings()
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'All bookings retrieved successfully',
    data: bookings,
  })
})
const getMyBookings = catchAsync(async (req, res) => {
  const bookings = await BookingServices.getMyBookings()
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'User bookings retrieved successfully',
    data: bookings,
  })
})

export const bookingControllers = {
  createBooking,
  getAllBookings,
  getMyBookings
}
