import { Router } from 'express'
import { serviceRouter } from '../module/service/service.route'
import { slotRouter } from '../module/slot/slot.route'
import { bookingRouter, myBookingRouter } from '../module/booking/booking.route'

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

]

routes.forEach((route) => router.use(route.path, route.route))

export default router
