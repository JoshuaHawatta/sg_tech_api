import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

type ItokenedClient = {
	_id: Types.ObjectId | string
	accesses: ['Client', 'Seller'?]
	name: string
}

const apiSecret = process.env.API_SECRET as string

export default class JwtTokenHandler {
	static generateToken(client: ItokenedClient, res: Response): Response {
		const newToken = jwt.sign(
			{ name: client.name, _id: client._id, accesses: client.accesses },
			apiSecret,

			{ expiresIn: '4 hours' }
		)

		return res.status(200).json({ message: 'Bem vindo(a) ao sistema!', newToken, _id: client._id })
	}

	static async getToken(req: Request): Promise<string> {
		const authHeader = req.headers.authorization

		return authHeader?.split(' ')[1] ?? 'INVALID_CLIENT_TOKEN'
	}

	static async getClientByToken(req: Request, res: Response): Promise<ItokenedClient> {
		const token = await JwtTokenHandler.getToken(req)

		if (!token) res.status(401).json({ message: 'Acesso negado!' })

		return jwt.verify(token, apiSecret) as Promise<ItokenedClient>
	}

	static async verifyToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const token = await JwtTokenHandler.getToken(req)

		if (!token) res.status(401).json({ message: 'Acesso negado!' })

		try {
			const decodedClient = jwt.verify(token, apiSecret)
			console.log(decodedClient)

			return next()
		} catch (err) {
			return res.status(500).json({ message: 'Token inválido!' })
		}
	}
}
