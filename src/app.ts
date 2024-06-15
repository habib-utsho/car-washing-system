import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { globalErrHandler, notFoundErrHandler } from './app/middleware/errHandler'
import router from './app/routes/routes'

const app = express()


// Parser
app.use(cors())
app.use(express.json())


// Routes
app.use('/api', router)


// Home route to test server
app.get('/', (req, res)=> {
    res.status(200).send({success: true, message: 'This is homepage'})
})


// err handling middleware 
app.use(notFoundErrHandler)
app.use(globalErrHandler)


export default app
