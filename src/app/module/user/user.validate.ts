import { z } from 'zod'

const createUserZodSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
  role: z.enum(['admin', 'user']),
  address: z.string(),
})
const signinUserZodSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export const userZodSchema = {
  createUserZodSchema,
  signinUserZodSchema
}