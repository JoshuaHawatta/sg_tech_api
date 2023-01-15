import IAppointment from '../interfaces/IAppointment'
import moment from 'moment'
import IEmailContent from '../interfaces/IEmailContent'

const emailSender = process.env.NODE_MAILER_EMAIL as string

export default class MailingHandler {
	static appointmentEmail(to: string, appointmentContent: IAppointment): IEmailContent {
		const { appointmentDate, confirmedService } = appointmentContent
		const choosedDate = moment(appointmentDate).format('MM/MM/YYYY, hh:mm') ?? 'Data indisponível!'

		const text = confirmedService
			? `Seu agendamento na data: ${choosedDate} foi realizado com sucesso!`
			: `Seu agendamento na data: ${choosedDate} infelizmente precisou ser recusado!`

		const subject = confirmedService ? 'Agendamento confirmado!' : 'Agendamento recusado :('

		return { from: emailSender, to, subject, text }
	}

	static finishedServiceEmail(to: string): IEmailContent {
		return {
			from: emailSender,
			to,
			subject: 'Serviço finalizado!',
			text: 'Muito obrigado pela preferência, esperamos em breve ver você novamente!',
		}
	}
}
