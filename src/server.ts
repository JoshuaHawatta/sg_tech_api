import 'dotenv/config'
import express from 'express'
import appConfig from './config/appConfig'

const app = express()

appConfig(app)
app.listen(process.env.PORT || 5000)
