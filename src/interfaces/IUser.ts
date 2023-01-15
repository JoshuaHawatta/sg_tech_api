import IAppointment from './IAppointment'

interface IUser {
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

export default IUser
