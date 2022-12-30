import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	service: 'gmail',
	secure: false,

	auth: {
		user: process.env.NODE_MAILER_EMAIL as string,
		pass: process.env.NODE_MAILER_PASSWORD as string,
	},
})

export default transporter
