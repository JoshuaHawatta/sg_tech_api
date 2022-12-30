import { Router } from 'express'
import GeneralController from './controllers/GeneralController'
import AdminController from './controllers/AdminController'
import JwtTokenHandler from '../helpers/Jwt-token-handler'

const appointmentRouter = Router()

//ADMIN_ROUTES
appointmentRouter.post('/addappointment', JwtTokenHandler.verifyToken, GeneralController.addAppointment)

appointmentRouter.patch(
	'/confirmappointment/:id',
	JwtTokenHandler.verifyToken,
	AdminController.confirmOrDeclineAppointment
)

appointmentRouter.patch('/finishservice/:id', JwtTokenHandler.verifyToken, AdminController.finishService)

//GENERAL_ROUTES
appointmentRouter.get(
	'/allappointments/:id',
	JwtTokenHandler.verifyToken,
	GeneralController.getEspecificAppointment
)

appointmentRouter.get(
	'/allappointments',
	JwtTokenHandler.verifyToken,
	GeneralController.getAllAppointments
)

export default appointmentRouter
