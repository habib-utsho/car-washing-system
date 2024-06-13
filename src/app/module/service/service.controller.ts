import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import { serviceServices } from "./service.service";

const createService = catchAsync(async(req, res)=> {
    const result = await serviceServices.createService(req.body)
    return result
})
const getAllService = catchAsync(async(req, res)=> {
    const result = await serviceServices.getAllService()
    return result
})
const getServiceById = catchAsync(async(req, res)=> {
    const result = await serviceServices.getServiceById(req.params?.id as string)
    return result
})
const deleteServiceById = catchAsync(async(req, res)=> {
    const result = await serviceServices.deleteServiceById(req.params?.id as string)
    return result
})

const updateServiceById = catchAsync(async(req, res)=> {
    const result = await serviceServices.updateServiceById(req.params?.id, req.body)
})


export const serviceControllers = {
    createService,
    getAllService,
    getServiceById,
    deleteServiceById,
    updateServiceById
}