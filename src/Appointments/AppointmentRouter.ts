import { Router } from 'express'
import AppointmentController from './AppointmentController'
import JwtTokenHandler from '../helpers/Jwt-token-handler'

const appointmentRouter = Router()

appointmentRouter.post(
	'/addappointment',
	JwtTokenHandler.verifyToken,
	AppointmentController.addAppointment
)

appointmentRouter.get(
	'/clientappointments',
	JwtTokenHandler.verifyToken,
	AppointmentController.getUserAllAppointments
)

export default appointmentRouter
