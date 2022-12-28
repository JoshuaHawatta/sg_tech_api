import { Router } from 'express'
import AppointmentController from './AppointmentController'
import JwtTokenHandler from '../helpers/Jwt-token-handler'

const appointmentRouter = Router()

appointmentRouter.post(
	'/addappointment',
	JwtTokenHandler.verifyToken,
	AppointmentController.addAppointment
)

appointmentRouter.patch(
	'/confirmappointment/:id',
	JwtTokenHandler.verifyToken,
	AppointmentController.confirmOrDeclineAppointment
)

appointmentRouter.patch(
	'/finishservice/:id',
	JwtTokenHandler.verifyToken,
	AppointmentController.finishService
)

appointmentRouter.get(
	'/clientappointments',
	JwtTokenHandler.verifyToken,
	AppointmentController.getUserAllAppointments
)

appointmentRouter.get(
	'/allappointments',
	JwtTokenHandler.verifyToken,
	AppointmentController.getAllAppointments
)

export default appointmentRouter
