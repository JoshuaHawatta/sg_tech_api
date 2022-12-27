import { Router } from 'express'
import AppointmentController from './AppointmentController'
import JwtTokenHandler from '../helpers/Jwt-token-handler'

const appointmentRouter = Router()

appointmentRouter.get(
	'/clientappointments',
	JwtTokenHandler.verifyToken,
	AppointmentController.getClientAllAppointments
)

export default appointmentRouter
