import { model, Schema } from 'mongoose'
import generateDate from '../helpers/generate-date'
import IAppointment from '../interfaces/IAppointments'

const AppointmentSchema = model(
	'Appointment',

	new Schema<IAppointment>({
		service_type: { type: String, required: true },
		appointment_date: { type: Date },
		devilered_date: Date,
		client: Object,
		form_of_payment: String,
		total_payment: Number,
		createdAt: { type: Date, required: true, immutable: true, default: generateDate },
		updatedAt: { type: Date, required: true, default: generateDate },
	})
)

export default AppointmentSchema
