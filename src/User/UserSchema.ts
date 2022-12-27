import { Schema, model } from 'mongoose'
import IClient from '../interfaces/IUser'
import generateDate from '../helpers/generate-date'

const UserSchema = model(
	'Users',

	new Schema<IClient>({
		name: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: Number, required: true },
		password: { type: String, required: true },
		image: String,
		appointments: Array,
		accesses: { type: Array, default: ['Client'] },
		createdAt: { type: Date, required: true, immutable: true, default: generateDate },
		updatedAt: { type: Date, required: true, default: generateDate },
	})
)

export default UserSchema
