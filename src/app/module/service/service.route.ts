import { Router } from 'express'
import { serviceControllers } from './service.controller'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { serviceZodSchema } from './service.validate'
import { slotZodSchema } from '../slot/slot.validate'
import { slotsControllers } from '../slot/slot.controller'

const router = Router()

router.post(
  '/',
  zodValidateHandler(serviceZodSchema.createServiceZodSchema),
  serviceControllers.createService,
) //Only accessible by admin
router.post(
  '/slots',
  zodValidateHandler(slotZodSchema.createSlotZodSchema),
  slotsControllers.createSlot,
) //Only accessible by admin
router.get('/', serviceControllers.getAllService)
router.get('/:id', serviceControllers.getServiceById)
router.delete('/:id', serviceControllers.deleteServiceById) //Only accessible by admin
router.put(
  '/:id',
  zodValidateHandler(serviceZodSchema.updateServiceZodSchema),
  serviceControllers.updateServiceById,
) //Only accessible by admin

export { router as serviceRouter }
