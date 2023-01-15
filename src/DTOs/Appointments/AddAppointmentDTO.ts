import IUserMainData from '../../interfaces/IUserMainData'

type TAddAppointmentData = {
	serviceType: string
	appointmentDate: Date
	client: IUserMainData
	delivered: { finished: boolean }
}

export default class AddAppointmentDTO {
	private serviceType: string
	private appointmentDate: Date
	private client: IUserMainData
	private delivered: { finished: boolean }

	constructor(serviceType: string, appointmentDate: Date, client: IUserMainData) {
		this.serviceType = serviceType
		this.appointmentDate = new Date(appointmentDate)
		this.client = client
		this.delivered = { finished: false }
	}

	public getAppointment_date(): Date {
		return this.appointmentDate
	}

	public getData(): TAddAppointmentData {
		return {
			serviceType: this.serviceType,
			appointmentDate: this.appointmentDate,
			client: this.client,
			delivered: this.delivered,
		}
	}
}
