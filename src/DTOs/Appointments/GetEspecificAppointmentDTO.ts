import { Types } from 'mongoose'

import GetAllAppointmentDTO from './GetAllAppointmentsDTO'

type TGetEspecificAppointmentData = {
	_id: Types.ObjectId | string
	'client._id': Types.ObjectId
}

export default class GetEspecificAppointmentDTO extends GetAllAppointmentDTO {
	_id: Types.ObjectId | string

	constructor(_id: Types.ObjectId | string, clientId: Types.ObjectId) {
		super(clientId)

		this._id = _id
		this.clientId = clientId
	}

	public override getData(): TGetEspecificAppointmentData {
		return {
			_id: this._id,
			'client._id': this.clientId,
		}
	}
}
