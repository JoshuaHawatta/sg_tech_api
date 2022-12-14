import jwt from 'jsonwebtoken'
import { Response, Request, NextFunction } from 'express'
import ClientSchema from '../Client/ClientSchema'

const getUserByToken = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.header('Authorization')?.replace('Bearer ', '')

	if (!token) return res.status(401).json({ message: 'Acesso negado!' })

	const decodedToken = jwt.verify(token, `${process.env.API_SECRET}`)

	console.log(decodedToken)
	return next()
}

export default getUserByToken
