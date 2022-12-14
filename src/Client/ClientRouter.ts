import Router from 'express'
import ClientController from './ClientController'

const clientRouter = Router()

clientRouter.post('/register', ClientController.registerAccount)
clientRouter.post('/login', ClientController.login)

clientRouter.get('/checkclient', ClientController.checkLoggedClient)

export default clientRouter
