import IUserMainData from './IUserMainData'

type TDelivered = {
	devileredDate?: Date
	finished: boolean
}

interface IAppointment {
	serviceType: string
	delivered: TDelivered
	client?: IUserMainData
	confirmedService: boolean
	readonly appointmentDate: Date
	readonly createdAt: Date
	readonly updatedAt: Date
}

export default IAppointment
