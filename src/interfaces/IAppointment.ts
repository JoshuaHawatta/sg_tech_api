import IUserMainData from './IUserMainData'

type TDelivered = {
	devilered_date?: Date
	finished: boolean
}

interface IAppointment {
	service_type: string
	delivered: TDelivered
	client?: IUserMainData
	confirmedService: boolean
	readonly appointment_date: Date
	readonly createdAt: Date
	readonly updatedAt: Date
}

export default IAppointment
