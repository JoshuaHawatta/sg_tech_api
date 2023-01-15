import generateDate from '../../helpers/generate-date'

type TRegisterData = {
	name: string
	email: string
	phone: number
	password: string
	createdAt: Date
	updatedAt: Date
}

export default class RegisterDTO {
	private name: string
	private email: string
	private phone: number
	private password: string
	private createdAt: Date
	private updatedAt: Date

	constructor(name: string, email: string, phone: number, password: string) {
		this.name = name
		this.email = email
		this.phone = phone
		this.password = password
		this.createdAt = new Date(generateDate())
		this.updatedAt = new Date(generateDate())
	}

	public getData(): TRegisterData {
		return {
			name: this.name,
			email: this.email,
			phone: this.phone,
			password: this.password,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		}
	}
}
