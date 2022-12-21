import Router from 'express'
import ClientController from './ClientController'
import JwtTokenHandler from '../helpers/Jwt-token-handler'
import imageUpload from '../config/multer'

const clientRouter = Router()

clientRouter.post('/register', ClientController.registerAccount)
clientRouter.post('/login', ClientController.login)

clientRouter.patch(
	'/updatedata',
	JwtTokenHandler.verifyToken,
	imageUpload.single('image'),
	ClientController.updateAccountData
)

clientRouter.delete('/deleteaccount', JwtTokenHandler.verifyToken, ClientController.deleteAcccount)

clientRouter.get('/checkclient', JwtTokenHandler.verifyToken, ClientController.checkLoggedClient)

export default clientRouter
