import { Router } from "express";
import { serviceControllers } from "./service.controller";

const  router = Router()


router.post('/', serviceControllers.createService)
router.get('/:id', serviceControllers.getAllService)
router.get('/', serviceControllers.getServiceById)
router.delete('/', serviceControllers.deleteServiceById)
router.patch('/', serviceControllers.updateServiceById)


export {router as serviceRouter}