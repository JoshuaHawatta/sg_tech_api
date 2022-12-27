import IUserMainData from './IUserMainData'

type TPaymentForm = 'Dinheiro' | 'Crédito' | 'Débito' | 'Pix' | 'TED' | 'DOC'

interface IAppointment {
	service_type: string
	appointment_date: Date
	devilered_date?: Date
	client: IUserMainData
	form_of_payment?: TPaymentForm
	total_payment?: number
	readonly createdAt: Date
	readonly updatedAt: Date
}

export default IAppointment
