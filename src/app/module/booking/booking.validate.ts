import { z } from 'zod'
import { Types } from 'mongoose'


const createBookingZodSchema = z.object({
  serviceId: z.instanceof(Types.ObjectId),
  slotId: z.instanceof(Types.ObjectId),
  vehicleType: z.enum([
    'car',
    'truck',
    'SUV',
    'van',
    'motorcycle',
    'bus',
    'electricVehicle',
    'hybridVehicle',
    'bicycle',
    'tractor',
  ]),
  vehicleBrand: z.string(),
  vehicleModel: z.string(),
  manufacturingYear: z.number(),
  registrationPlate: z.string(),
})

export const bookingZodSchema = {
  createBookingZodSchema,
}