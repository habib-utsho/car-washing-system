import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/AppError'
import Service from '../service/service.model'
import { TSlot } from './slot.interface'
import Slot from './slot.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { slotSearchableFields } from './slot.constant'

const createSlot = async (payload: TSlot) => {
  const { service, startTime, endTime, ...restSlotProps } = payload || {}

  const isExistService = await Service.findById(service)

  if (!isExistService) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Service is not found!')
  }

  if (isExistService.isDeleted) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Service is deleted!')
  }

  const slots = []
  const serviceDuration = isExistService?.duration
  const startTimeToMin =
    Number(startTime?.split(':')[0]) * 60 + Number(startTime?.split(':')[1])
  const endTimeToMin =
    Number(endTime?.split(':')[0]) * 60 + Number(endTime?.split(':')[1])

  for (
    let time = startTimeToMin;
    time < endTimeToMin;
    time += serviceDuration
  ) {
    const slotStartTime = `${Math.floor(time / 60)
      .toString()
      .padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`
    const slotEndTime = `${Math.floor((time + serviceDuration) / 60)
      .toString()
      .padStart(
        2,
        '0',
      )}:${((time + serviceDuration) % 60).toString().padStart(2, '0')}`

    const slot = new Slot({
      startTime: slotStartTime,
      endTime: slotEndTime,
      service,
      ...restSlotProps,
    })
    slots.push(slot)
    await slot.save()
  }

  return slots
}
const getAllSlots = async (query: Record<string, unknown>) => {
  const slotsQuery = new QueryBuilder(Slot.find(), {
    ...query,
  })
    .searchQuery(slotSearchableFields)
    .filterQuery()
    .sortQuery()
    .paginateQuery()
    .fieldFilteringQuery()
    .populateQuery([
      {
        path: 'service',
      },
    ])

  const result = await slotsQuery?.queryModel
  const total = await Slot.countDocuments(slotsQuery.queryModel.getFilter())
  return { data: result, total }
}

const getAvailableSlots = async (query: Record<string, unknown>) => {
  const slotsQuery = new QueryBuilder(Slot.find(), {
    ...query,
    isBooked: 'available',
  })
    .searchQuery([])
    .filterQuery()
    .sortQuery()
    .paginateQuery()
    .fieldFilteringQuery()
    .populateQuery([
      {
        path: 'service',
      },
    ])

  const result = await slotsQuery?.queryModel
  const total = await Slot.countDocuments(slotsQuery.queryModel.getFilter())
  return { data: result, total }
}

export const slotServices = {
  createSlot,
  getAvailableSlots,
  getAllSlots,
}
