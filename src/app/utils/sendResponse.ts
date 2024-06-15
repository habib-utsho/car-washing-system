import { Response } from 'express'

const sendResponse = (
  res: Response,
  statusCode: number,
  format: { success: boolean; message: string; data: any },
) => {
  res.status(statusCode).send({
    success: format?.success,
    statusCode,
    message: format?.data?.length === 0 ?  "No Data Found" : format?.message,
    data: format?.data || null,
  })
}

export default sendResponse
