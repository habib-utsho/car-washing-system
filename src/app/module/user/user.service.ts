import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/AppError'
import { TUser, TUserSignin } from './user.interface'
import User from './user.model'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const createUser = async (payload: TUser) => {
  const isExistUser =  await User.findOne({email:payload?.email})
  if(isExistUser){
      throw new AppError(StatusCodes.FORBIDDEN, 'This email is already exist!')
  }
  const result = await User.create(payload)
  return result
}
const signinUser = async (payload: TUserSignin) => {
  const user = await User.findOne({email:payload.email})

  if(!user){
    throw new AppError(StatusCodes.NOT_FOUND,'User is not found')
  }
  const decryptPass = await bcrypt.compare(payload.password, user.password)
  if(!decryptPass){
    throw new AppError(StatusCodes.FORBIDDEN, 'Password is not match')
  }



  const jwtPayload = {
    email: user?.email,
    role: user?.role
  }
  const accessToken = jwt.sign(jwtPayload, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '100d' })


  return {accessToken}

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
