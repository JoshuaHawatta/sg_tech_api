import { Request, Response } from 'express'
import AppointmentSchema from './AppointmentSchema'

//HELPERS
import JwtTokenHandler from '../helpers/Jwt-token-handler'
import availableDate from '../helpers/available-date'

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
			appointment_date: Date.parse(appointmentDate),
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
				message: 'Agendamento em espera, será confirmado em até 48 horas!',
				newAppointment,
			})
		} catch (err) {
			return res
				.status(500)
				.json({ message: 'Não foi possível realizar o agendamento no momento!' })
		}
	}

	static async getUserAllAppointments(req: Request, res: Response): Promise<Response> {
		const loggedUser = await JwtTokenHandler.getUserByToken(req, res)

		try {
			const allAppointments = await AppointmentSchema.find({ 'client._id': loggedUser._id }).sort(
				'-createdAt'
			)

			return res.status(200).json(allAppointments)
		} catch (err) {
			return res
				.status(500)
				.json({ message: 'Não foi possível buscar seus angendamentos no momento!' })
		}
	}
}
