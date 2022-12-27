import IAppointment from './IAppointments'

interface IClient {
	name: string
	email: string
	phone: number
	password: string
	image?: string
	appointments: IAppointment[]
	accesses: ['Client', 'Seller'?]
	readonly createdAt: Date
	readonly updatedAt: Date
}

export default IClient
