import { Router, Request, Response } from 'express'

const clientRouter = Router()

clientRouter.get('/', (req: Request, res: Response) => {
	return res.status(200).json({ message: 'Rotas de clientes criadas' })
})

export default clientRouter
