import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/AppError'
import Service from '../service/service.model'
import Slot from '../slot/slot.model'
import { TBooking } from './booking.interface'
import Booking from './booking.model'
import mongoose, { Types } from 'mongoose'

const createBooking = async (
  payload: Partial<TBooking> & {
    serviceId: Types.ObjectId
    slotId: Types.ObjectId
  },
) => {
  const { serviceId, slotId, ...restBookingProps } = payload || {}

  const isExistService = await Service.findById(serviceId)
  const isExistSlot = await Slot.findById(slotId)

  if (!isExistService) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Service is not found!')
  }
  if (!isExistSlot) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Slot is not found!')
  }

  if (isExistSlot.isBooked == 'booked') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Slot is already booked!')
  }

  if (isExistSlot.service != serviceId) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Service is not found in slot!')
  }

  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    isExistSlot.isBooked = 'booked'
    await isExistSlot.save({ session })

    const booking = await Booking.create(
      [
        {
          service: serviceId,
          slot: slotId,
          customer: serviceId, //TODO: need to replace customer id by token
          ...restBookingProps,
        },
      ],
      { session },
    )

    if (!booking?.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to booking!')
    }

    await session.commitTransaction()

    const result = await Booking.findById(booking[0]._id)
      .populate('service')
      .populate('slot') //TODO: need to add customer populate
    return result
  } catch (e: any) {
    await session.abortTransaction()
    throw new Error(e)
  } finally {
    await session.endSession()
  }
}

const getAllBookings = async () => {
  const result = await Booking.find({})
    .populate('service')
    .populate('customer')
    .populate('slot')
  return result
}
const getMyBookings = async () => {
  // TODO: Need to find my bookings using token
  const result = await Booking.find({})
    .populate('service')
    .populate('customer')
    .populate('slot')
  return result
}

export const BookingServices = {
  createBooking,
  getAllBookings,
  getMyBookings,
}
