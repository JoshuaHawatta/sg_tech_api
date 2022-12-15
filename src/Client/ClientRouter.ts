import Router from 'express'
import ClientController from './ClientController'
import verifyToken from '../middlewares/verify-token'

const clientRouter = Router()

clientRouter.post('/register', ClientController.registerAccount)
clientRouter.post('/login', ClientController.login)

clientRouter.get('/checkclient', verifyToken, ClientController.checkLoggedClient)

export default clientRouter
