import { Request, Response } from 'express'
import UserSchema from '../UserSchema'
import { Types } from 'mongoose'

//HELPERS
import JwtTokenHandler from '../../../helpers/Jwt-token-handler'

//DTOs
import GetUserDTO from '../../../DTOs/User/GetUserDTO'

export default class AdminController {
	static async getOneUser(req: Request, res: Response): Promise<Response> {
		const { id } = req.params
		const loggedUser = await JwtTokenHandler.getUserByToken(req, res)

		if (!loggedUser.accesses.includes('Seller'))
			return res.status(401).json({ message: 'Acessso negado!' })
		else if (!Types.ObjectId.isValid(id) || id === loggedUser._id.toString())
			return res.status(422).json({ message: 'ID inválido!' })

		const filterData = new GetUserDTO(id)

		try {
			const user = await UserSchema.findOne(filterData.getByField()).select(
				GetUserDTO.selectFieldsQuery()
			)

			return res.status(200).json(user)
		} catch (err) {
			return res.status(500).json({ message: 'Não foi possível achar o usuário desejado!' })
		}
	}

	static async getAllUsers(req: Request, res: Response): Promise<Response> {
		const loggedUser = await JwtTokenHandler.getUserByToken(req, res)

		if (!loggedUser.accesses.includes('Seller'))
			return res.status(401).json({ message: 'Acesso negado!' })

		try {
			const users = await UserSchema.find()
				.select(GetUserDTO.selectFieldsQuery())
				.sort('-updatedAt')

			const clients = users.filter(({ accesses }) => !accesses.includes('Seller'))

			return res.status(200).json(clients)
		} catch (err) {
			return res.status(500).json({ message: 'Não foi possível buscar os usuários no momento!' })
		}
	}
}
