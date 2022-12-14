import { Request, Response } from 'express'
import ClientSchema from './ClientSchema'
import generateToken from '../helpers/generate-token'
import bcrypt from 'bcrypt'

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
}
