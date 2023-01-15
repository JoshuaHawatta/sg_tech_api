import generateDate from '../../helpers/generate-date'

export default class UpdateDTO {
	private name: string
	private email: string
	private phone: number
	private password: string
	private image?: string
	private updatedAt: Date

	constructor(name: string, email: string, phone: number, password: string, image?: string) {
		this.name = name
		this.email = email
		this.phone = phone
		this.password = password
		this.image = image
		this.updatedAt = new Date(generateDate())
	}

	public getData() {
		return {
			name: this.name,
			email: this.email,
			phone: this.phone,
			password: this.password,
			image: this.image,
			updatedAt: this.updatedAt,
		}
	}
}
