import { Request, Response, NextFunction } from 'express'
import JwtTokenHandler from '../helpers/Jwt-token-handler'
import jwt from 'jsonwebtoken'

const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	const token = await JwtTokenHandler.getToken(req)

	if (!token) res.status(401).json({ message: 'Acesso negado!' })

	try {
		const decodedClient = jwt.verify(token, process.env.API_SECRET as string)
		console.log(decodedClient)

		return next()
	} catch (err) {
		return res.status(500).json({ message: 'Token inválido!' })
	}
}

export default verifyToken
