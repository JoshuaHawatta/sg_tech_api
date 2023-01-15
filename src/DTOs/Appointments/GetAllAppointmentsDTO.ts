import { Types } from 'mongoose'

type TGetAllAppointmentData = {
	'client._id': Types.ObjectId
}

export default class GetAllAppointmentDTO {
	clientId: Types.ObjectId

	constructor(clientId: Types.ObjectId) {
		this.clientId = clientId
	}

	public getData(): TGetAllAppointmentData {
		return {
			'client._id': this.clientId,
		}
	}
}
