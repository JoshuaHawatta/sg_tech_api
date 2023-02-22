import generateDate from '../../helpers/generate-date'
import { TUserDTOReturnData } from '../../types/user'

export default class RegisterDTO {
	private createdAt: Date
	private updatedAt: Date

	constructor(
		private name: string,
		private email: string,
		private phone: number,
		private password: string
	) {
		this.name = name
		this.email = email
		this.phone = phone
		this.password = password
		this.createdAt = new Date(generateDate())
		this.updatedAt = new Date(generateDate())
	}

	public getData(): TUserDTOReturnData {
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
