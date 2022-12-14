import express, { Express } from 'express'
import cors from 'cors'
import mongoDBConnect from '../database/database'

const appConfig = (app: Express): void => {
	//SOLVE_CORS
	app.use(cors({ credentials: true, origin: process.env.API_CONSUMER_URL }))

	//SOLVE_JSON
	app.use(express.json())

	//connect_to_DB
	mongoDBConnect()
}

export default appConfig
