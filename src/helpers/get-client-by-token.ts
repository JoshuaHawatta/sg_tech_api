import jwt from 'jsonwebtoken'
import { Response, Request } from 'express'
import getToken from './get-token'

interface IJwtTokenedClient {
	_id: string
	name: string
}

const getClientByToken = (req: Request, res: Response) => {
	const token = getToken(req, res)

	return jwt.verify(token, process.env.API_SECRET as string) as IJwtTokenedClient
}

export default getClientByToken
