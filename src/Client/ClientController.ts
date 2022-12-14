import { Request, Response } from 'express'
import ClientSchema from './ClientSchema'

export default class ClientController {
	static async registerAccount(req: Request, res: Response) {
		const { name, email, phone, password, confirmPassword } = req.body

		if (!name) return res.status(422).json({ message: 'Nome obrigatório!' })
		if (!email) return res.status(422).json({ message: 'E-mail obrigatório!' })
		if (!phone) return res.status(422).json({ message: 'Telefone obrigatório!' })
		if (!password) return res.status(422).json({ message: 'Senha obrigatória!' })
		if (!confirmPassword) return res.status(422).json({ message: 'Confirme sua senha!' })
		if (confirmPassword !== password)
			return res.status(422).json({ message: 'As senhas não estão iguais!' })

		const client = await (await ClientSchema.create({ name, email, phone, password })).save()

		return res.status(201).json({ message: 'Conta criada com sucesso!', client })
	}
}
