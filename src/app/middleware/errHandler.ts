import { ErrorRequestHandler, RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

const notFoundErrHandler: RequestHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  const statusCode = StatusCodes.NOT_FOUND
  res
    .status(statusCode)
    .send({ success: false, statusCode, message: error?.message })
}

const globalErrHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  const message = err.message || 'Internal Server Error'
  const errSources = [
    {
      path: '',
      message: 'Internal Server Error',
    },
  ]

  res.status(statusCode).send({
    success: false,
    statusCode,
    message,
    errSources,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err?.stack,
  })
}

export { notFoundErrHandler, globalErrHandler }
