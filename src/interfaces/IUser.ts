import IAppointment from './IAppointment'

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
