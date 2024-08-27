import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { slotServices } from './slot.service'

const createSlot = catchAsync(async (req, res) => {
  const service = await slotServices.createSlot(req.body)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Slots created successfully',
    data: service,
  })
})
const getAvailableSlots = catchAsync(async (req, res) => {
  const { data, total } = await slotServices.getAvailableSlots(req.query)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Available slots are retrieved successfully!',
    data,
    meta: { query: req.query, total },
  })
})

const getAllSlots = catchAsync(async (req, res) => {
  const { data, total } = await slotServices.getAllSlots(req.query)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Available slots are retrieved successfully!',
    data,
    meta: { query: req.query, total },
  })
})

export const slotsControllers = {
  createSlot,
  getAvailableSlots,
  getAllSlots,
}
