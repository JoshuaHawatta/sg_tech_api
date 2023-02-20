import { Types } from 'mongoose'
import { TGetAllAppointmentData } from '../../types/appointment'

export default class GetAllAppointmentDTO {
	constructor(protected clientId: Types.ObjectId) {
		this.clientId = clientId
	}

	public getData(): TGetAllAppointmentData {
		return { 'client._id': this.clientId }
	}
}
