import { Router } from 'express'
import { serviceControllers } from './service.controller'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { serviceZodSchema } from './service.validate'

const router = Router()

router.post(
  '/',
  zodValidateHandler(serviceZodSchema.createServiceZodSchema),
  serviceControllers.createService,
)
router.get('/:id', serviceControllers.getAllService)
router.get('/', serviceControllers.getServiceById)
router.delete('/', serviceControllers.deleteServiceById)
router.patch(
  '/',
  zodValidateHandler(serviceZodSchema.updateServiceZodSchema),
  serviceControllers.updateServiceById,
)

export { router as serviceRouter }
