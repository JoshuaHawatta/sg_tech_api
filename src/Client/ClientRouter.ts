import Router from 'express'
import ClientController from './ClientController'
import JwtTokenHandler from '../helpers/Jwt-token-handler'

const clientRouter = Router()

clientRouter.post('/register', ClientController.registerAccount)
clientRouter.post('/login', ClientController.login)

clientRouter.get('/checkclient', JwtTokenHandler.verifyToken, ClientController.checkLoggedClient)

export default clientRouter
