import IAppointment from '../interfaces/IAppointment'
import moment from 'moment'
import IEmailContent from '../interfaces/IEmailContent'

const emailSender = process.env.NODE_MAILER_EMAIL as string

export default class MailingHandler {
	static appointmentEmail(to: string, appointmentContent: IAppointment): IEmailContent {
		const appointmentDate =
			moment(appointmentContent.appointment_date).format('MM/MM/YYYY, hh:mm') ??
			'Data indisponível!'

		const text = appointmentContent.confirmedService
			? `Seu agendamento na data: ${appointmentDate} foi realizado com sucesso!`
			: `Seu agendamento na data: ${appointmentDate} infelizmente precisou ser recusado!`

		const subject = appointmentContent.confirmedService
			? 'Agendamento confirmado!'
			: 'Agendamento recusado :('

		return { from: emailSender, to, subject, text } as IEmailContent
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
