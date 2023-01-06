import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

const login = [
	body('email')
		.not()
		.isEmpty()
		.withMessage('E-mail obrigatório!')
		.normalizeEmail()
		.isEmail()
		.withMessage('Utilize um e-mail válido!'),
	body('password').trim().not().isEmpty().withMessage('Senha obrigatória!'),
]

const loginResults = (req: Request, res: Response, next: NextFunction): Response | void => {
	const results = validationResult(req).array()

	if (results.length > 0) return res.status(422).json({ message: results[0].msg })

	return next()
}

export { login, loginResults }
