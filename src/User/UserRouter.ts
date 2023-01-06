import Router from 'express'
import UserController from './UserController'
import imageUpload from '../config/multer'

//MIDDLEWARES
import verifyToken from '../middlewares/verifyToken'
import { login, loginResults } from '../middlewares/validations/user/login'
import { createOrUpdate, createOrUpdateResults } from '../middlewares/validations/user/createOrUpdate'

const userRouter = Router()

userRouter.post('/register', UserController.registerAccount)
userRouter.post('/login', login, loginResults, UserController.login)

userRouter.patch(
	'/updatedata',
	verifyToken,
	createOrUpdate,
	createOrUpdateResults,
	imageUpload.single('image'),
	UserController.updateAccountData
)

userRouter.delete('/deleteaccount', verifyToken, UserController.deleteAccount)

userRouter.get('/checkuser', verifyToken, UserController.checkLoggedUser)

export default userRouter
