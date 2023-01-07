import { body } from 'express-validator'

const addAppointment = [
	body('serviceType').trim().not().isEmpty().withMessage('Informe o tipo de serviço!!'),
	body('appointmentDate').trim().not().isEmpty().withMessage('Data de agendamento obrigatória!'),
]

export default addAppointment
