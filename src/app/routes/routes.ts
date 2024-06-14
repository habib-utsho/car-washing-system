import { Router } from "express";
import { serviceRouter } from "../module/service/service.route";
import { slotRouter } from "../module/slot/slot.route";

const  router = Router()
const routes = [
    {
        path: '/services',
        route: serviceRouter 
    },
    {
        path: '/slots',
        route: slotRouter 
    }
]

routes.forEach(route=> router.use(route.path, route.route))


export default router