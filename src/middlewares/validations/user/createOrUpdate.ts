import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

const createOrUpdate = [
	body('name').trim().not().isEmpty().withMessage('Nome obrigatório!'),
	body('email')
		.not()
		.isEmpty()
		.withMessage('E-mail obrigatório!')
		.normalizeEmail()
		.isEmail()
		.withMessage('Utilize um e-mail válido!'),
	body('phone').not().isEmpty().withMessage('Telefone obrigatório!'),
	body('password').trim().not().isEmpty().withMessage('Senha obrigatória!'),

	body('confirmPassword')
		.trim()
		.not()
		.isEmpty()
		.withMessage('Confirme sua senha!')
		.custom((value, { req }) => {
			const { password, name } = req.body

			if (value !== password) throw new Error('As senhas não estão iguais!')
			else if (value === name) throw new Error('A senha não pode ser igual ao nome!')
			else if (value === null) throw new Error('Senha inválida tente novamente!')

			return true
		}),
]

const createOrUpdateResults = (req: Request, res: Response, next: NextFunction): Response | void => {
	const results = validationResult(req).array()

	if (results.length > 0) return res.status(422).json({ message: results[0].msg })

	return next()
}

export { createOrUpdateResults, createOrUpdate }
