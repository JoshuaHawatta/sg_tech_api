import { Request, Response } from 'express'
import ClientSchema from './ClientSchema'
import bcrypt from 'bcrypt'

//HELPERS
import generateDate from '../helpers/generate-date'
import JwtTokenHandler from '../helpers/Jwt-token-handler'

export default class ClientController {
	static async registerAccount(req: Request, res: Response): Promise<Response> {
		const { name, email, phone, password, confirmPassword } = req.body

		if (!name) return res.status(422).json({ message: 'Nome obrigatório!' })
		else if (!email) return res.status(422).json({ message: 'E-mail obrigatório!' })
		else if (!phone) return res.status(422).json({ message: 'Telefone obrigatório!' })
		else if (!password) return res.status(422).json({ message: 'Senha obrigatória!' })
		else if (!confirmPassword) return res.status(422).json({ message: 'Confirme sua senha!' })
		else if (confirmPassword !== password)
			return res.status(422).json({ message: 'As senhas não estão iguais!' })
		else if (password === name)
			return res.status(422).json({ message: 'A senha não pode ser igual ao nome!' })

		const existClient = await ClientSchema.findOne({ email: email }).select('-password')

		if (existClient) return res.status(422).json({ message: 'Este e-mail já está em uso!' })

		const salt = await bcrypt.genSalt(16)
		const encryptedPassword = await bcrypt.hash(password, salt)

		const client = new ClientSchema({
			name,
			email,
			phone,
			password: encryptedPassword,
			createdAt: generateDate(),
			updatedAt: generateDate(),
		})

		try {
			const signClient = await client.save()
			return JwtTokenHandler.generateToken(signClient, res)
		} catch (err) {
			return res.status(500).json({ message: 'Não coseguimos realizar seu cadastro no momento.' })
		}
	}

	static async login(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body

		if (!email) return res.status(422).json({ message: 'E-mail obrigatório!' })
		else if (!password) return res.status(422).json({ message: 'Senha obrigatória!' })

		const client = await ClientSchema.findOne({ email })

		if (!client)
			return res.status(422).json({ message: 'Erro! Veja se o e-mail ou a senha estão corretos!' })

		const matchPasswords = await bcrypt.compare(password, client.password)

		if (!matchPasswords)
			return res.status(422).json({ message: 'Senha digitada não é igual a cadastrada!' })

		try {
			return JwtTokenHandler.generateToken(client, res)
		} catch (err) {
			return res.status(500).json({ message: 'Não foi possível realizar o login no momento' })
		}
	}

	static async checkLoggedClient(req: Request, res: Response): Promise<Response> {
		const tokenedClient = await JwtTokenHandler.getClientByToken(req, res)
		const databaseClient = await ClientSchema.findById(tokenedClient._id).select('-password')

		return res.status(200).json(databaseClient)
	}

	static async updateAccountData(req: Request, res: Response): Promise<Response> {
		const { name, email, phone, password, confirmPassword } = req.body
		const image = req.file?.filename

		const loggedClient = await JwtTokenHandler.getClientByToken(req, res)

		if (!name) return res.status(422).json({ message: 'Nome obrigatório!' })
		else if (!email) return res.status(422).json({ message: 'E-mail obrigatório!' })
		else if (!phone) return res.status(422).json({ message: 'Telefone obrigatório!' })
		else if (!password) return res.status(422).json({ message: 'Senha obrigatória!' })
		else if (!confirmPassword) return res.status(422).json({ message: 'Confirme sua senha!' })
		else if (confirmPassword !== password)
			return res.status(422).json({ message: 'As senhas não estão iguais!' })

		const clientNewData = {
			name,
			email,
			phone,
			image,
			password,
			updatedAt: generateDate(),
		}

		if (password === confirmPassword && password !== null) {
			const salt = await bcrypt.genSalt(16)
			const newHashedPassword = await bcrypt.hash(password, salt)

			clientNewData.password = newHashedPassword
		}

		try {
			await ClientSchema.findOneAndUpdate(
				{ _id: loggedClient._id },
				{ $set: clientNewData },
				{ new: true }
			)

			return res.status(200).json({ message: 'Dados atualizados com sucesso!' })
		} catch (err) {
			return res.status(500).json({ message: 'Não foi possível atualizar seus dados no momento!' })
		}
	}

	static async deleteAcccount(req: Request, res: Response): Promise<Response> {
		const loggedClient = await JwtTokenHandler.getClientByToken(req, res)

		try {
			await ClientSchema.findByIdAndDelete(loggedClient._id)
			return res.status(200).json({ message: 'Conta deletada com sucesso!' })
		} catch (err) {
			return res.status(500).json({ message: 'Não foi possível deletar sua conta no momento!' })
		}
	}
}
