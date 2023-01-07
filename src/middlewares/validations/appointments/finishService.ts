import { body, param } from 'express-validator'
import { Types } from 'mongoose'

const finishService = [
	body('finished').trim().not().isEmpty().withMessage('informe se o serviço foi finalizado!'),
	body('deliveredDate').trim().not().isEmpty().withMessage('Informe a data de entrega!'),

	param('id')
		.not()
		.isEmpty()
		.withMessage('Informe um ID!')
		.custom(value => {
			if (Types.ObjectId.isValid(value)) throw new Error('ID inválido!')

			return true
		}),
]

export default finishService
