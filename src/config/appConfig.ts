import express, { Express } from 'express'
import cors from 'cors'
import mongoDBConnect from '../database/database'

//ROUTERS
import userRouter from '../User/UserRouter'
import appointmentRouter from '../Appointments/AppointmentRouter'

const appConfig = (app: Express): void => {
	//SOLVE_CORS
	app.use(cors({ credentials: true, origin: process.env.API_CONSUMER_URL }))

	//SOLVE_JSON
	app.use(express.json())

	//ROUTES
	app.use('/user', userRouter)
	app.use('/appointments', appointmentRouter)

	//connect_to_DB
	mongoDBConnect()
}

export default appConfig
