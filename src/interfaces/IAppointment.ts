import { TUserMainData } from '../types/user'
import { TDelivered } from '../types/appointment'

interface IAppointment {
	serviceType: string
	delivered: TDelivered
	client?: TUserMainData
	confirmedService: boolean
	readonly appointmentDate: Date
	readonly createdAt: Date
	readonly updatedAt: Date
}

export default IAppointment
