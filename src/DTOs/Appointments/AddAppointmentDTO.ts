import { TUserMainData } from '../../types/user'
import { TAddAppointmentDTO, TDelivered } from '../../types/appointment'

export default class AddAppointmentDTO {
	private serviceType: string
	private appointmentDate: Date
	private client: TUserMainData
	private delivered: TDelivered

	constructor(serviceType: string, appointmentDate: Date, client: TUserMainData) {
		this.serviceType = serviceType
		this.appointmentDate = new Date(appointmentDate)
		this.client = client
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
