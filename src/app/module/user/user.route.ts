import { Router } from 'express'
import { userControllers } from './user.controller'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { userZodSchema } from './user.validate'
import { userServices } from './user.service'
import auth from '../../middleware/auth'
import { USER_ROLE } from './user.constant'

const router = Router()

router.post(
  '/signup',
  zodValidateHandler(userZodSchema.createUserZodSchema),
  userControllers.createUser,
)
router.post(
  '/login',
  zodValidateHandler(userZodSchema.signinUserZodSchema),
  userControllers.signinUser,
)
router.post('/refresh-token', userServices.refreshToken)
router.get('/users', auth(USER_ROLE.admin), userControllers.getAllUser)

router.delete(
  '/users/:id',
  auth(USER_ROLE.admin),
  userControllers.deleteUserById,
)
router.patch(
  '/users/make-admin/:id',
  auth(USER_ROLE.admin),
  userControllers.userToAdminById,
)

export { router as userRouter }
