import { Router } from 'express'
import { serviceControllers } from './service.controller'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { serviceZodSchema } from './service.validate'
import { slotZodSchema } from '../slot/slot.validate'
import { slotsControllers } from '../slot/slot.controller'
import auth from '../../middleware/auth'

const router = Router()

router.post(
  '/', auth(),
  zodValidateHandler(serviceZodSchema.createServiceZodSchema),
  serviceControllers.createService,
) //Only accessible by admin
router.post(
  '/slots',
  auth(),
  zodValidateHandler(slotZodSchema.createSlotZodSchema),
  slotsControllers.createSlot,
) //Only accessible by admin
router.get('/', serviceControllers.getAllService)
router.get('/:id', serviceControllers.getServiceById)
router.delete('/:id', auth(), serviceControllers.deleteServiceById) //Only accessible by admin
router.put(
  '/:id',
  auth(),
  zodValidateHandler(serviceZodSchema.updateServiceZodSchema),
  serviceControllers.updateServiceById,
) //Only accessible by admin

export { router as serviceRouter }
