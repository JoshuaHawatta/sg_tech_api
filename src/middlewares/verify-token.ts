import { Request, Response, NextFunction } from 'express'
import getToken from '../helpers/get-token'
import jwt from 'jsonwebtoken'

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const token = getToken(req, res)

	try {
		const decodedClient = jwt.verify(token, process.env.API_SECRET as string)
		console.log(decodedClient)

		return next()
	} catch (err) {
		return res.status(500).json({ message: 'Token inválido!' })
	}
}

export default verifyToken
