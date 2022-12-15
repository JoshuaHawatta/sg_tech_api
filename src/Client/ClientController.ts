import { Request, Response } from 'express'
import ClientSchema from './ClientSchema'
import bcrypt from 'bcrypt'

//HELPERS
import generateToken from '../helpers/generate-token'
import getClientByToken from '../helpers/get-client-by-token'

export default class ClientController {
	static async registerAccount(req: Request, res: Response) {
		const { name, email, phone, password, confirmPassword } = req.body

		if (!name) return res.status(422).json({ message: 'Nome obrigatório!' })
		else if (!email) return res.status(422).json({ message: 'E-mail obrigatório!' })
		else if (!phone) return res.status(422).json({ message: 'Telefone obrigatório!' })
		else if (!password) return res.status(422).json({ message: 'Senha obrigatória!' })
		else if (!confirmPassword) return res.status(422).json({ message: 'Confirme sua senha!' })
		else if (confirmPassword !== password)
			return res.status(422).json({ message: 'As senhas não estão iguais!' })

		const existClient = await ClientSchema.findOne({ email: email }).select('-password')

		if (existClient) return res.status(422).json({ message: 'Este e-mail já está em uso!' })

		const salt = await bcrypt.genSalt(16)
		const encryptedPassword = await bcrypt.hash(password, salt)

		const client = new ClientSchema({ name, email, phone, password: encryptedPassword })

		try {
			const signClient = await client.save()
			await generateToken(signClient, res)
		} catch (err) {
			return res.status(500).json({ message: 'Não coseguimos realizar seu cadastro no momento.' })
		}
	}

	static async login(req: Request, res: Response) {
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
			await generateToken(client, res)
		} catch (err) {
			return res.status(500).json({ message: 'Não foi possível realizar o login no momento' })
		}
	}

	static async checkLoggedClient(req: Request, res: Response) {
		const tokenedClient = await getClientByToken(req, res)
		const databaseClient = await ClientSchema.findById(tokenedClient._id).select('-password')

		return res.status(200).json(databaseClient)
	}
}
