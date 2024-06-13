import { Router } from "express";
import { serviceRouter } from "../module/service/service.route";

const  router = Router()
const routes = [
    {
        path: '/services',
        route: serviceRouter 
    }
]

routes.forEach(route=> router.use(route.path, route.route))


export default router