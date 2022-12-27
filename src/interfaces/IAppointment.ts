import IUserMainData from './IUserMainData'

type TPayment = {
	type: 'Dinheiro' | 'Crédito' | 'Débito' | 'Pix' | 'TED' | 'DOC'
	total: number
}

interface IAppointment {
	service_type: string
	readonly appointment_date: Date
	readonly devilered_date?: Date
	client?: IUserMainData
	readonly payment?: TPayment
	readonly createdAt: Date
	readonly updatedAt: Date
}

export default IAppointment
