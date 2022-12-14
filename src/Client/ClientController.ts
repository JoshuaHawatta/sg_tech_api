import { Request, Response } from 'express'
import ClientSchema from './ClientSchema'

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

		const existClient = await ClientSchema.find({ email: email }).select('-password')

		if (existClient.length > 0)
			return res.status(422).json({ message: 'Este e-mail já está em uso!' })

		const client = new ClientSchema({ name, email, phone, password })

		try {
			const signClient = await client.save()

			return res.status(201).json({ message: 'Conta criada com sucesso!', signClient })
		} catch (err) {
			return res.status(500).json({ message: 'Não coseguimos realizar seu cadastro no momento.' })
		}
	}
}
