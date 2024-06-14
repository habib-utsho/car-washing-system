import { Types } from 'mongoose'

export type TService = {
  name: string
  description: string
  price: number
  duration: number
  isDeleted: boolean
}
