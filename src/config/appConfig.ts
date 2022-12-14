import express, { Express } from 'express'
import cors from 'cors'
import mongoDBConnect from '../database/database'
import clientRouter from '../Client/ClientRouter'

const appConfig = (app: Express): void => {
	//SOLVE_CORS
	app.use(cors({ credentials: true, origin: process.env.API_CONSUMER_URL }))

	//SOLVE_JSON
	app.use(express.json())

	//ROUTES
	app.use('/client', clientRouter)

	//connect_to_DB
	mongoDBConnect()
}

export default appConfig
