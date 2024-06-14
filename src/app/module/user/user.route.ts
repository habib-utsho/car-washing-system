import { Router } from 'express'
import { userControllers } from './user.controller'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { userZodSchema } from './user.validate'

const router = Router()

router.post('/signup', zodValidateHandler(userZodSchema.createUserZodSchema), userControllers.createUser)
router.post('/login', zodValidateHandler(userZodSchema.signinUserZodSchema), userControllers.signinUser)
router.get('/', userControllers.getAllUser)

export { router as userRouter }
