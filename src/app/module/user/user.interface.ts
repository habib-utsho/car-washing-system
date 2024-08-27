import { USER_ROLE } from './user.constant'

export type TUserRole = keyof typeof USER_ROLE
export type TUser = {
  name: string
  email: string
  password: string
  phone: string
  role: TUserRole
  address: string
  isDeleted: boolean
}

export type TUserSignin = {
  email: string
  password: string
}
