import { Request, Response } from 'express'
import AppointmentSchema from '../AppointmentSchema'
import { Types } from 'mongoose'

//HELPERS
import JwtTokenHandler from '../../helpers/Jwt-token-handler'
import availableDate from '../../helpers/available-date'

export default class AppointmentController {
	static async addAppointment(req: Request, res: Response): Promise<Response> {
		const { serviceType, appointmentDate } = req.body
		const loggedUser = await JwtTokenHandler.getUserByToken(req, res)

		if (loggedUser.accesses.includes('Seller'))
			return res.status(401).json({ message: 'Você não pode realizar um agendamento!' })
		else if (!serviceType) return res.status(422).json({ message: 'Informe o tipo de serviço!' })
		else if (!appointmentDate)
			return res.status(422).json({ message: 'Data de agendamento obrigatória!' })

		const confirmedAppointments = await AppointmentSchema.find({
			confirmedService: true,
			'delivered.finished': false,
		})

		const appointment = new AppointmentSchema({
			service_type: serviceType,
			appointment_date: new Date(appointmentDate),
			client: loggedUser,
			delivered: { finished: false },
		})

		const unavailableDates = confirmedAppointments.map(({ appointment_date }) =>
			availableDate(appointment_date, appointment.appointment_date)
		)

		if (unavailableDates.some(appointment => appointment))
			return res.status(422).json({ message: 'Este horário já está reservado!' })

		try {
			const newAppointment = await appointment.save()

			return res.status(201).json({
				message: 'Feito! Vamos avaliar seu caso. Até 48 horas você receberá um e-mail nosso.',
				newAppointment,
			})
		} catch (err) {
			return res
				.status(500)
				.json({ message: 'Não foi possível realizar o agendamento no momento!' })
		}
	}

	static async getEspecificAppointment(req: Request, res: Response): Promise<Response> {
		const { id } = req.params
		const loggedUser = await JwtTokenHandler.getUserByToken(req, res)

		if (!Types.ObjectId.isValid(id)) return res.status(422).json({ message: 'ID inválido!' })

		try {
			if (loggedUser.accesses.includes('Seller')) {
				const appointment = await AppointmentSchema.findById(id)

				return res.status(200).json(appointment)
			}

			const clientAppointment = await AppointmentSchema.findOne({
				_id: id,
				'client._id': loggedUser._id,
			})

			if (!clientAppointment)
				return res.status(422).json({ message: 'Nenhum agendamento encontrado com este ID!' })

			return res.status(200).json(clientAppointment)
		} catch (err) {
			return res.status(500).json({ message: 'Não foi possível resgatar este agendamento!' })
		}
	}

	static async getAllAppointments(req: Request, res: Response): Promise<Response> {
		const loggedUser = await JwtTokenHandler.getUserByToken(req, res)

		try {
			if (loggedUser.accesses.includes('Seller')) {
				const allAppointments = await AppointmentSchema.find().sort('-createdAt')
				return res.status(200).json(allAppointments)
			}

			const clientAllAppointments = await AppointmentSchema.find({
				'client._id': loggedUser._id,
			}).sort('-createdAt')

			return res.status(200).json(clientAllAppointments)
		} catch (err) {
			return res.status(500).json({ message: 'Não foi possível resgatar os agendamentos!' })
		}
	}
}
