import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/AppError'
import { TUser, TUserSignin } from './user.interface'
import User from './user.model'
import bcrypt from 'bcrypt'

const createUser = async (payload: TUser) => {
  const result = await User.create(payload)
  return result
}
const signinUser = async (payload: TUserSignin) => {
  const existUser = await User.findOne({email:payload.email})

  if(!existUser){
    throw new AppError(StatusCodes.NOT_FOUND,'User is not found')
  }
  const decryptPass = await bcrypt.compare(payload.password, existUser.password)
  if(!decryptPass){
    throw new AppError(StatusCodes.BAD_REQUEST, 'Password is not match')
  }
  const result = await User.findOne({email: existUser.email})
  return result
}
const getAllUser = async () => {
  const result = await User.find({})
  return result
}

export const userServices = {
  createUser,
  signinUser,
  getAllUser,
}
