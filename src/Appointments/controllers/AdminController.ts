import { Request, Response } from 'express'
import AppointmentSchema from '../AppointmentSchema'
import { Types } from 'mongoose'
import transporter from '../../config/mailTransporter'
import IAppointment from '../../interfaces/IAppointment'

//HELPERS
import JwtTokenHandler from '../../helpers/Jwt-token-handler'
import MailingHandler from '../../helpers/Mailing-handler'

export default class AdminController {
	static async confirmOrDeclineAppointment(req: Request, res: Response): Promise<Response> {
		const { confirmedService } = req.body
		const { id } = req.params
		const loggedUser = await JwtTokenHandler.getUserByToken(req, res)

		if (!loggedUser.accesses.includes('Seller'))
			return res.status(401).json({ message: 'Acesso negado!' })
		else if (!Types.ObjectId.isValid(id)) return res.status(422).json({ message: 'ID inválido!' })

		const appointment = (await AppointmentSchema.findById(id)) as IAppointment

		if (appointment?.confirmedService)
			return res.status(422).json({ message: 'Agendamento já confirmado!' })

		//IF_APPOINTMENT_IS_CONFIRMED,_UPDATE_AND_SEND_EMAIL,_ELSE:_DELETE_IT__AND_SEND_EMAIL.
		try {
			if (confirmedService) {
				const newAppointment = (await AppointmentSchema.findOneAndUpdate(
					{ _id: id },
					{ $set: { confirmedService } },
					{ new: true }
				)) as IAppointment

				transporter.sendMail(
					MailingHandler.appointmentEmail(appointment.client?.email as string, newAppointment),
					err => {
						if (err) console.log(err.message)
					}
				)

				return res.status(200).json({ message: 'Agendamento confirmado com sucesso!' })
			}

			await AppointmentSchema.findByIdAndDelete(id)

			transporter.sendMail(
				MailingHandler.appointmentEmail(appointment.client?.email as string, appointment),
				err => {
					if (err) console.log(err.message)
				}
			)

			return res.status(200).json({ message: 'Agendamento recusado com sucesso!' })
		} catch (err) {
			return res.status(500).json({ message: 'Não foi possível realizar esta ação no momento!' })
		}
	}

	static async finishService(req: Request, res: Response): Promise<Response> {
		const { id } = req.params
		const { finished, deliveredDate } = req.body
		const loggedUser = await JwtTokenHandler.getUserByToken(req, res)

		if (!loggedUser.accesses.includes('Seller'))
			return res.status(401).json({ message: 'Acesso negado!' })
		else if (!Types.ObjectId.isValid(id)) return res.status(422).json({ message: 'ID inválido!' })
		else if (!finished)
			return res.status(422).json({ message: 'Informe se o serviço foi finalizado!' })
		else if (!deliveredDate) return res.status(422).json({ message: 'Informe a data de entrega!' })

		const existingService = await AppointmentSchema.findById(id)

		if (!existingService?.confirmedService)
			return res.status(422).json({ message: 'Você não pode finalizar serviços não confirmados!' })
		else if (existingService.delivered.finished)
			return res.status(422).json({ message: 'Serviço já finalizado!' })

		const generateDeliveredDate = new Date(deliveredDate)

		if (generateDeliveredDate < existingService.appointment_date)
			return res
				.status(422)
				.json({ message: 'A data de entrega não pode ser antes da data do agendamento!' })

		const finishedServiceData = {
			delivered: { finished, deliveredDate: generateDeliveredDate },
		}

		try {
			const clientService = await AppointmentSchema.findOneAndUpdate(
				{ _id: id },
				{ $set: finishedServiceData },
				{ new: true }
			)

			transporter.sendMail(
				MailingHandler.finishedServiceEmail(clientService?.client?.email as string),
				err => {
					if (err) console.log(err.message)
				}
			)

			return res.status(200).json({ message: 'Serviço finalizado com sucesso!', clientService })
		} catch (err) {
			return res.status(500).json({ message: 'Não foi possível finalizar o serviço!' })
		}
	}
}
