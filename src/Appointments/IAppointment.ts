type Tclient = {
	name: string
	email: string
	phone: number
	image?: string
}

type TpaymentForm = 'Dinheiro' | 'Cartão de crédito/Débito' | 'Pix' | 'Outro'

interface IAppointment {
	service_type: string
	appointment_date: Date
	devilered_date?: Date
	client: Tclient
	form_of_payment?: TpaymentForm
	total_payment?: number
	readonly createdAt: Date
	readonly updatedAt: Date
}

export default IAppointment
