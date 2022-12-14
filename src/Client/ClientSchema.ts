import { Schema, model } from 'mongoose'
import IClient from './IClient'
import generateDate from '../helpers/generate-date'

const ClientSchema = model(
	'Client',

	new Schema<IClient>({
		name: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: Number, required: true },
		password: { type: String, required: true },
		image: String,
		my_appointments: Object,
		createdAt: { type: Date, required: true, immutable: true, default: generateDate },
		updatedAt: { type: Date, required: true, default: generateDate },
	})
)

export default ClientSchema
