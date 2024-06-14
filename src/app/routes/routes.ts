import { Router } from 'express'
import { serviceRouter } from '../module/service/service.route'
import { slotRouter } from '../module/slot/slot.route'
import { bookingRouter, myBookingRouter } from '../module/booking/booking.route'
import { userRouter } from '../module/user/user.route'

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
    route: bookingRouter
  },
  {
    path: '/',
    route: myBookingRouter
  },
  {
    path: '/auth',
    route: userRouter
  },

]

routes.forEach((route) => router.use(route.path, route.route))

export default router
