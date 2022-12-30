import Router from 'express'
import UserController from './UserController'
import JwtTokenHandler from '../helpers/Jwt-token-handler'
import imageUpload from '../config/multer'

const userRouter = Router()

userRouter.post('/register', UserController.registerAccount)
userRouter.post('/login', UserController.login)

userRouter.patch(
	'/updatedata',
	JwtTokenHandler.verifyToken,
	imageUpload.single('image'),
	UserController.updateAccountData
)

userRouter.delete('/deleteaccount', JwtTokenHandler.verifyToken, UserController.deleteAccount)

userRouter.get('/checkuser', JwtTokenHandler.verifyToken, UserController.checkLoggedUser)

export default userRouter
