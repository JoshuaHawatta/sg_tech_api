import { Request, Response } from 'express'
import JwtTokenHandler from '../helpers/Jwt-token-handler'
import AppointmentSchema from './AppointmentSchema'

export default class AppointmentController {
	static async getAllAppointments(req: Request, res: Response) {
		const loggedUser = await JwtTokenHandler.getUserByToken(req, res)

		try {
			const allAppointments = await AppointmentSchema.find({ 'client._id': loggedUser._id }).sort(
				'-createdAt'
			)

			res.status(200).json(allAppointments)
		} catch (err) {
			res.status(500).json({ message: 'Não foi possível buscar seus angendamentos no momento!' })
		}
	}
}
