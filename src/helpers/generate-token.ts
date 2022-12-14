import jtw from 'jsonwebtoken'
import { Response } from 'express'
import { Types } from 'mongoose'

type TClient = {
	_id: Types.ObjectId
	name: string
}

const generateToken = async (client: TClient, res: Response) => {
	const newToken = jtw.sign({ name: client.name, id: client._id }, `${process.env.API_SECRET}`, {
		expiresIn: '8 hours',
	})

	return res.status(200).json({ message: 'Bem vindo(a) ao sistema!', newToken, id: client._id })
}

export default generateToken
