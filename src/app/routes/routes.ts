import { Router } from 'express'
import { serviceRouter } from '../module/service/service.route'
import { slotRouter } from '../module/slot/slot.route'
import { bookingRouter } from '../module/booking/booking.route'
import { userRouter } from '../module/user/user.route'
import { statsRouter } from '../module/stats/stats.route'

const router = Router()
const routes = [
  {
    path: '/services',
    route: serviceRouter,
  },
  {
    path: '/slots',
    route: slotRouter,
  },
  {
    path: '/bookings',
    route: bookingRouter,
  },
  {
    path: '/auth',
    route: userRouter,
  },
  {
    path: '/stats',
    route: statsRouter,
  },
]

routes.forEach((route) => router.use(route.path, route.route))

export default router
