import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import {
  globalErrHandler,
  notFoundErrHandler,
} from './app/middleware/errHandler'
import router from './app/routes/routes'
import cookieParser from 'cookie-parser'

const app = express()

// parser
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true)
      return callback(null, origin)
    },
    credentials: true,
  }),
)
app.use(cookieParser())
app.use(express.json())

// Routes
app.use('/api/v1', router)

// Home route to test server
app.get('/', (req, res) => {
  res.status(200).send({ success: true, message: 'This is homepage' })
})

// err handling middleware
app.use(notFoundErrHandler)
app.use(globalErrHandler)

export default app
