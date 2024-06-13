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
app.use('/api/v1', router)

app.get('/api/v1/', (req, res)=> {
    res.status(200).send({success: true, message: 'This is test route', data: null})
})


// err handler middleware 
app.use(notFoundErrHandler)
app.use(globalErrHandler)


export default app
