import { Request, Response } from 'express'
import UserSchema from './UserSchema'
import bcrypt from 'bcrypt'

//HELPERS
import JwtTokenHandler from '../../helpers/Jwt-token-handler'

//DTOs
import RegisterDTO from '../../DTOs/User/RegisterDTO'
import UpdateDTO from '../../DTOs/User/UpdateDTO'

export default class UserController {
	static async registerAccount(req: Request, res: Response): Promise<Response> {
		const { name, email, phone, password } = req.body
		const existUser = await UserSchema.findOne({ email: email }).select('-password')

		if (existUser) return res.status(422).json({ message: 'Este e-mail já está em uso!' })

		const salt = await bcrypt.genSalt(16)
		const encryptedPassword = await bcrypt.hash(password, salt)
		const newUser = new RegisterDTO(name, email, phone, encryptedPassword)

		const user = new UserSchema(newUser.getData())

		try {
			const signUser = await user.save()
			return JwtTokenHandler.generateToken(signUser, res)
		} catch (err) {
			return res.status(500).json({ message: 'Não coseguimos realizar seu cadastro no momento.' })
		}
	}

	static async login(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body

		const user = await UserSchema.findOne({ email })

		if (!user)
			return res.status(422).json({ message: 'Erro! Veja se o e-mail ou a senha estão corretos!' })

		const matchPasswords = await bcrypt.compare(password, user.password)

		if (!matchPasswords)
			return res.status(422).json({ message: 'Senha digitada não é igual a cadastrada!' })

		try {
			return JwtTokenHandler.generateToken(user, res)
		} catch (err) {
			return res.status(500).json({ message: 'Não foi possível realizar o login no momento' })
		}
	}

	static async checkLoggedUser(req: Request, res: Response): Promise<Response> {
		const tokenedUser = await JwtTokenHandler.getUserByToken(req, res)
		const databaseUser = await UserSchema.findById(tokenedUser._id).select('-password')

		return res.status(200).json(databaseUser)
	}

	static async updateAccountData(req: Request, res: Response): Promise<Response> {
		const { name, email, phone, password } = req.body
		const image = req.file?.filename

		const loggedUser = await JwtTokenHandler.getUserByToken(req, res)

		const salt = await bcrypt.genSalt(16)
		const hashedPassword = await bcrypt.hash(password, salt)

		const updateData = new UpdateDTO(name, email, phone, hashedPassword, image)

		try {
			await UserSchema.findOneAndUpdate(
				{ _id: loggedUser._id },
				{ $set: updateData.getData() },
				{ new: true }
			)

			return res.status(200).json({ message: 'Dados atualizados com sucesso!' })
		} catch (err) {
			return res.status(500).json({ message: 'Não foi possível atualizar seus dados no momento!' })
		}
	}

	static async deleteAccount(req: Request, res: Response): Promise<Response> {
		const loggedUser = await JwtTokenHandler.getUserByToken(req, res)

		try {
			await UserSchema.findByIdAndDelete(loggedUser._id)
			return res.status(200).json({ message: 'Conta deletada com sucesso!' })
		} catch (err) {
			return res.status(500).json({ message: 'Não foi possível deletar sua conta no momento!' })
		}
	}
}
