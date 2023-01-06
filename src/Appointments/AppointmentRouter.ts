import { Router } from 'express'
import GeneralController from './controllers/GeneralController'
import AdminController from './controllers/AdminController'
import verifyToken from '../middlewares/verifyToken'

const appointmentRouter = Router()

//ADMIN_ROUTES
appointmentRouter.post('/addappointment', verifyToken, GeneralController.addAppointment)

appointmentRouter.patch(
	'/confirmappointment/:id',
	verifyToken,
	AdminController.confirmOrDeclineAppointment
)

appointmentRouter.patch('/finishservice/:id', verifyToken, AdminController.finishService)

//GENERAL_ROUTES
appointmentRouter.get('/allappointments/:id', verifyToken, GeneralController.getEspecificAppointment)

appointmentRouter.get('/allappointments', verifyToken, GeneralController.getAllAppointments)

export default appointmentRouter
