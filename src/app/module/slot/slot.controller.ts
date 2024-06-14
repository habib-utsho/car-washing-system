import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/AppError'
import catchAsync from '../../utils/catchAsync'
import { slotServices } from './slot.service'
import sendResponse from '../../utils/sendResponse'

const createSlot = catchAsync(async (req, res) => {
  const service = await slotServices.createSlot(req.body)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Slots created successfully',
    data: service,
  })
})
const getAvailableSlots = catchAsync(async (req, res) => {
  const services = await slotServices.getAvailableSlots()
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Available slots retrieved successfully',
    data: services,
  })
})


export const slotsControllers = {
    createSlot,
    getAvailableSlots
}
