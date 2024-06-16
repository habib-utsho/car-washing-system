import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/AppError'
import Service from '../service/service.model'
import Slot from '../slot/slot.model'
import { TBooking } from './booking.interface'
import Booking from './booking.model'
import mongoose, { Types } from 'mongoose'
import User from '../user/user.model'

const createBooking = async (
  email: string,
  payload: Partial<TBooking> & {
    serviceId: Types.ObjectId
    slotId: Types.ObjectId
  },
) => {
  const { serviceId, slotId, ...restBookingProps } = payload || {}

  const isExistService = await Service.findById(serviceId)
  const isExistSlot = await Slot.findById(slotId)
  const isExistUser = await User.findOne({ email })

  if (!isExistUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not found!')
  }
  if (!isExistService || isExistService?.isDeleted) {
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
          customer: isExistUser?._id,
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
      .populate('customer')
      .populate('service')
      .populate('slot')
    return result
  } catch (e: any) {
    await session.abortTransaction()
    throw new AppError(StatusCodes.BAD_REQUEST, e.message)
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
const getMyBookings = async (email: string) => {
  // TODO: Need to find my bookings using token
  const user = await User.findOne({ email })

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not found!')
  }

  const result = await Booking.find({ customer: user })
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
