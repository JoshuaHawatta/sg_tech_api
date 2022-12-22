import IAppointment from '../../Appointments/IAppointment'

interface IClient {
	name: string
	email: string
	phone: number
	password: string
	image?: string
	my_appointments?: IAppointment[]
	accesses: ['Client', 'Seller'?]
	readonly createdAt: Date
	readonly updatedAt: Date
}

export default IClient
