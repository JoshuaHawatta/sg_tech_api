import { model, Schema } from 'mongoose'
import generateDate from '../../helpers/generate-date'
import IAppointment from '../../interfaces/IAppointment'

const AppointmentSchema = model(
	'Appointments',

	new Schema<IAppointment>({
		serviceType: { type: String, required: true },
		delivered: Object,
		client: Object,
		confirmedService: { type: Boolean, default: false },
		appointmentDate: { type: Date, required: true, immutable: true },
		createdAt: { type: Date, required: true, immutable: true, default: generateDate },
		updatedAt: { type: Date, required: true, default: generateDate },
	})
)

export default AppointmentSchema
