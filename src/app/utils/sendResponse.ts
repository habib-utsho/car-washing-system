import { Response } from 'express'
import { StatusCodes } from 'http-status-codes';

const sendResponse = (
  res: Response,
  statusCode: number,
  format: { success: boolean; message: string; data: any },
) => {
  res.status(statusCode).send({
    success: format?.data?.length === 0 ? false : format?.success,
    statusCode : format?.data?.length === 0 ? StatusCodes.NOT_FOUND : statusCode,
    message: format?.data?.length === 0 ? 'No Data Found' : format?.message,
    data: format?.data || null,
  })
}

export default sendResponse