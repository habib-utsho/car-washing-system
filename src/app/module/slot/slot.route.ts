import { Router } from 'express'
import { slotsControllers } from './slot.controller'

const router = Router()

router.get('/', slotsControllers.getAvailableSlots)

export { router as slotRouter }
