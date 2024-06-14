import { StatusCodes } from "http-status-codes"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { userServices } from "./user.service"

const createUser = catchAsync(async (req, res) => {
  const user = await userServices.createUser(req.body)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'User registered successfully',
    data: user,
  })
})
const signinUser = catchAsync(async (req, res) => {
  const user = await userServices.signinUser(req.body)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'User logged in successfully',
    data: user,
  })
})
const getAllUser = catchAsync(async (req, res) => {
  const users = await userServices.getAllUser()
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Users are retrieved successfully',
    data: users,
  })
})

export const userControllers = {
  createUser,
  signinUser,
  getAllUser,
}