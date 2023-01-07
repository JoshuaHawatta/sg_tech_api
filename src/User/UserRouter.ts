import Router from 'express'
import UserController from './UserController'
import imageUpload from '../config/multer'

//MIDDLEWARES
import verifyToken from '../middlewares/verifyToken'
import login from '../middlewares/validations/user/login'
import getValidationsResults from '../middlewares/getValidationsResults'
import createOrUpdate from '../middlewares/validations/user/createOrUpdate'

const userRouter = Router()

userRouter.post('/register', createOrUpdate, getValidationsResults, UserController.registerAccount)
userRouter.post('/login', login, getValidationsResults, UserController.login)

userRouter.patch(
	'/updatedata',
	verifyToken,
	imageUpload.single('image'),
	createOrUpdate,
	getValidationsResults,
	UserController.updateAccountData
)

userRouter.delete('/deleteaccount', verifyToken, UserController.deleteAccount)

userRouter.get('/checkuser', verifyToken, UserController.checkLoggedUser)

export default userRouter
