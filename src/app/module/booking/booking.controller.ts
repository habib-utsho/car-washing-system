import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BookingServices } from './booking.service'
import { Request, Response } from 'express'

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const booking = await BookingServices.createBooking(req.user?.email, req.body)
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
const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const bookings = await BookingServices.getMyBookings(req.user?.email)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'User bookings retrieved successfully',
    data: bookings,
  })
})

export const bookingControllers = {
  createBooking,
  getAllBookings,
  getMyBookings,
}
