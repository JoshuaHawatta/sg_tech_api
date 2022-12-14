import 'dotenv/config'
import express from 'express'
import appConfig from './config/appConfig'
import clientRouter from './Client/ClientRouter'

const app = express()

appConfig(app)

app.use('/users', clientRouter)

app.listen(process.env.PORT)
