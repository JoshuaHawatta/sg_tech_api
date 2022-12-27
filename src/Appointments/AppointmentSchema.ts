import { model, Schema } from 'mongoose'
import generateDate from '../helpers/generate-date'
import IAppointment from '../interfaces/IAppointment'

const AppointmentSchema = model(
	'Appointments',

	new Schema<IAppointment>({
		service_type: { type: String, required: true },
		appointment_date: { type: Date, required: true, immutable: true },
		devilered_date: { type: Date, immutable: true },
		client: Object,
		payment: Object,
		createdAt: { type: Date, required: true, immutable: true, default: generateDate },
		updatedAt: { type: Date, required: true, default: generateDate },
	})
)

export default AppointmentSchema
