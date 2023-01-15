import Router from 'express'
import imageUpload from '../../config/multer'

//CONTROLLERS
import GeneralController from './controllers/GeneralController'
import AdminController from './controllers/AdminController'

//MIDDLEWARES
import verifyToken from '../../middlewares/verifyToken'
import login from '../../middlewares/validations/user/login'
import getValidationsResults from '../../middlewares/getValidationsResults'
import createOrUpdate from '../../middlewares/validations/user/createOrUpdate'

const userRouter = Router()

//GENERAL_UNPROTECTED_ROUTES
userRouter.post('/register', createOrUpdate, getValidationsResults, GeneralController.registerAccount)
userRouter.post('/login', login, getValidationsResults, GeneralController.login)

//PROTECTED_GENERAL_ROUTES
userRouter.use(verifyToken)

userRouter.patch(
	'/updatedata',
	imageUpload.single('image'),
	createOrUpdate,
	getValidationsResults,
	GeneralController.updateAccountData
)

userRouter.delete('/deleteaccount', GeneralController.deleteAccount)
userRouter.get('/checkuser', GeneralController.checkLoggedUser)

//ADMIN_ROUTES
userRouter.get('/showusers/:id', AdminController.getOneUser)
userRouter.get('/showusers', AdminController.getAllUsers)

export default userRouter
