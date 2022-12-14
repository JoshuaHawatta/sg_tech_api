import { Request, Response } from 'express'

const getToken = (req: Request, res: Response) => {
	const authHeader = req.headers.authorization

	if (!authHeader) res.status(401).json({ message: 'Acesso negado!' })

	return authHeader?.split(' ')[1] ?? 'INVALID_CLIENT_TOKEN'
}

export default getToken
