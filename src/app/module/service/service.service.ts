import { TService } from "./service.interface";
import Service from "./service.model";

const createService = async (payload:TService)=> {
    const result = await Service.create(payload)
    return result
}
const getAllService = async ()=> {
    const result = await Service.find({})
    return result
}
const getServiceById = async (id:string)=> {
    const result = await Service.findById(id)
    return result
}
const deleteServiceById = async (id:string)=> {
    const result = await Service.findByIdAndUpdate(id, {isDeleted: true}, {new:true})
    return result
}
const updateServiceById = async (id:string, payload:TService)=> {
    const result = await Service.findByIdAndUpdate(id, payload)
    return result
}



export const serviceServices = {
    createService,
    getAllService,
    getServiceById,
    deleteServiceById,
    updateServiceById
}
