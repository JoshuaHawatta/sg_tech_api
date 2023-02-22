import { TUserMainData } from '../../types/user'
import { TAddAppointmentDTO, TDelivered } from '../../types/appointment'

export default class AddAppointmentDTO {
	private delivered: TDelivered

	constructor(
		private serviceType: string,
		private appointmentDate: Date,
		private client: TUserMainData
	) {
		this.serviceType = serviceType
		this.client = client
		this.appointmentDate = new Date(appointmentDate)
		this.delivered = { finished: false }
	}

	public getAppointment_date(): Date {
		return this.appointmentDate
	}

	public getData(): TAddAppointmentDTO {
		return {
			serviceType: this.serviceType,
			appointmentDate: this.appointmentDate,
			client: this.client,
			delivered: this.delivered,
		}
	}
}
