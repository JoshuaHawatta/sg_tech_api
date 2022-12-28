import IUserMainData from './IUserMainData'

type TPayment = {
	type: 'Dinheiro' | 'Crédito' | 'Débito' | 'Pix' | 'TED' | 'DOC'
	total: number
}

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
	readonly payment?: TPayment
	readonly createdAt: Date
	readonly updatedAt: Date
}

export default IAppointment
