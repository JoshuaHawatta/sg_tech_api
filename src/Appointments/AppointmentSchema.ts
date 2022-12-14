import { model, Schema } from 'mongoose'
import generateDate from '../helpers/generate-date'
import IAppointment from './IAppointment'

const AppointmentSchema = model(
	'Appointment',

	new Schema<IAppointment>({
		service_type: { String, required: true },
		appointment_date: { Date },
		devilered_date: Date,
		client: Object,
		form_of_payment: String,
		total_payment: Number,
		createdAt: { Date, required: true, immutable: true, default: generateDate },
		updatedAt: { Date, required: true, default: generateDate },
	})
)

export default AppointmentSchema
