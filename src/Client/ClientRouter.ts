import Router from 'express'
import ClientController from './ClientController'

const clientRouter = Router()

clientRouter.post('register', ClientController.registerAccount)

export default clientRouter
