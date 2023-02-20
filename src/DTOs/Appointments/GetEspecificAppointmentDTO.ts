import { Types } from 'mongoose'
import GetAllAppointmentDTO from './GetAllAppointmentsDTO'
import { TGetEspecificAppointmentData } from '../../types/appointment'

export default class GetEspecificAppointmentDTO extends GetAllAppointmentDTO {
	constructor(private _id: Types.ObjectId | string, protected clientId: Types.ObjectId) {
		super(clientId)

		this._id = _id
		this.clientId = clientId
	}

	public override getData(): TGetEspecificAppointmentData {
		return { _id: this._id, 'client._id': this.clientId }
	}
}
