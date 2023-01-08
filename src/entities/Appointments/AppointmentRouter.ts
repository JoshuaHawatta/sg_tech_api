import { Router } from 'express'

//CONTROLLERS
import GeneralController from './controllers/GeneralController'
import AdminController from './controllers/AdminController'

//MIDDLEWARES
import verifyToken from '../../middlewares/verifyToken'
import finishService from '../../middlewares/validations/appointments/finishService'
import addAppointment from '../../middlewares/validations/appointments/addAppointment'
import getValidationsResults from '../../middlewares/getValidationsResults'

const appointmentRouter = Router()

//ADMIN_ROUTES
appointmentRouter.patch(
	'/confirmappointment/:id',
	verifyToken,
	AdminController.confirmOrDeclineAppointment
)

appointmentRouter.patch(
	'/finishservice/:id',
	verifyToken,
	finishService,
	getValidationsResults,
	AdminController.finishService
)

//USER_ROUTES
appointmentRouter.post(
	'/addappointment',
	verifyToken,
	addAppointment,
	getValidationsResults,
	GeneralController.addAppointment
)

//GENERAL_ROUTES
appointmentRouter.get('/allappointments/:id', verifyToken, GeneralController.getEspecificAppointment)

appointmentRouter.get('/allappointments', verifyToken, GeneralController.getAllAppointments)

export default appointmentRouter
