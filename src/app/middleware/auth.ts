import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import jwt from 'jsonwebtoken'
import AppError from '../errors/AppError'
import { StatusCodes } from 'http-status-codes'
import { CustomRequest } from '../interface/request'

const auth = () => {
  return catchAsync((req: CustomRequest, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization?.split(' ')?.[1]
    if (!bearerToken) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'User is not authorized')
    }

    const user = jwt.verify(
      bearerToken,
      process.env.JWT_ACCESS_SECRET as string,
    )

    if(!user){
        throw new AppError(StatusCodes.UNAUTHORIZED, 'User is not authorized')
    }

    req.user = user
    // console.log(user)

    next()
  })
}

export default auth
