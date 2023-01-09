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

//RESOLVE_TOKEN_INTERCEPTION
appointmentRouter.use(verifyToken)

//ADMIN_ROUTES
appointmentRouter.patch('/confirmappointment/:id', AdminController.confirmOrDeclineAppointment)

appointmentRouter.patch(
	'/finishservice/:id',
	finishService,
	getValidationsResults,
	AdminController.finishService
)

//USER_ROUTES
appointmentRouter.post(
	'/addappointment',
	addAppointment,
	getValidationsResults,
	GeneralController.addAppointment
)

//GENERAL_ROUTES
appointmentRouter.get('/allappointments/:id', GeneralController.getEspecificAppointment)
appointmentRouter.get('/allappointments', GeneralController.getAllAppointments)

export default appointmentRouter
