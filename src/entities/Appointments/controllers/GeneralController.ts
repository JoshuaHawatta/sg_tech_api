import { Request, Response } from 'express'
import AppointmentSchema from '../AppointmentSchema'
import { Types } from 'mongoose'

//HELPERS
import JwtTokenHandler from '../../../helpers/Jwt-token-handler'
import availableDate from '../../../helpers/available-date'

//DTOs
import AddAppointmentDTO from '../../../DTOs/Appointments/AddAppointmentDTO'
import FindConfirmedAppointmentsDTO from '../../../DTOs/Appointments/FindConfirmedAppointmentsDTO'
import GetEspecificAppointmentDTO from '../../../DTOs/Appointments/GetEspecificAppointmentDTO'
import GetAllAppointmentDTO from '../../../DTOs/Appointments/GetAllAppointmentsDTO'

export default class AppointmentController {
	static async addAppointment(req: Request, res: Response): Promise<Response> {
		const { serviceType, appointmentDate } = req.body
		const loggedUser = await JwtTokenHandler.getUserByToken(req, res)

		if (loggedUser.accesses.includes('Seller'))
			return res.status(401).json({ message: 'Você não pode realizar um agendamento!' })

		const appointmentsFilters = new FindConfirmedAppointmentsDTO()
		const confirmedAppointments = await AppointmentSchema.find(appointmentsFilters.getData())

		const appointmentData = new AddAppointmentDTO(serviceType, appointmentDate, loggedUser)

		const unavailableDates = confirmedAppointments.map(({ appointmentDate }) =>
			availableDate(appointmentDate, appointmentData.getAppointment_date())
		)

		if (unavailableDates.some(appointment => appointment))
			return res.status(422).json({ message: 'Este horário já está reservado!' })

		try {
			const appointment = new AppointmentSchema(appointmentData)
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

			const filterData = new GetEspecificAppointmentDTO(id, loggedUser._id)
			const clientAppointment = await AppointmentSchema.findOne(filterData.getData())

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

			const filterData = new GetAllAppointmentDTO(loggedUser._id)
			const clientAllAppointments = await AppointmentSchema.find(filterData.getData()).sort(
				'-createdAt'
			)

			return res.status(200).json(clientAllAppointments)
		} catch (err) {
			return res.status(500).json({ message: 'Não foi possível resgatar os agendamentos!' })
		}
	}
}
