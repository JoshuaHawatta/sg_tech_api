import { body } from 'express-validator'

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

export default login
