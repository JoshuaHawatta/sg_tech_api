import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

type TClient = {
	_id: Types.ObjectId | string
	name: string
}

export default class JwtTokenHandler {
	static generateToken(client: TClient, res: Response): Response {
		const newToken = jwt.sign(
			{ name: client.name, _id: client._id },
			process.env.API_SECRET as string,

			{ expiresIn: '4 hours' }
		)

		return res.status(200).json({ message: 'Bem vindo(a) ao sistema!', newToken, _id: client._id })
	}

	static async getToken(req: Request, res: Response): Promise<string> {
		const authHeader = req.headers.authorization

		if (!authHeader) res.status(401).json({ message: 'Acesso negado!' })

		return authHeader?.split(' ')[1] ?? 'INVALID_CLIENT_TOKEN'
	}

	static async getClientByToken(req: Request, res: Response): Promise<TClient> {
		const token = await JwtTokenHandler.getToken(req, res)

		return jwt.verify(token, process.env.API_SECRET as string) as Promise<TClient>
	}

	static async verifyToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const token = await JwtTokenHandler.getToken(req, res)

		try {
			const decodedClient = jwt.verify(token, process.env.API_SECRET as string)
			console.log(decodedClient)

			return next()
		} catch (err) {
			return res.status(500).json({ message: 'Token inválido!' })
		}
	}
}
