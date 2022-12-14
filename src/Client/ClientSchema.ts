import { Schema, model } from 'mongoose'
import IClient from './IClient'
import generateDate from '../helpers/generate-date'

const ClientSchema = model(
	'Client',

	new Schema<IClient>({
		name: { String, required: true },
		email: { String, required: true },
		phone: { Number, required: true },
		password: { String, required: true },
		image: String,
		my_appointments: Object,
		createdAt: { Date, required: true, immutable: true, default: generateDate },
		updatedAt: { Date, required: true, default: generateDate },
	})
)

export default ClientSchema
