import generateDate from '../../helpers/generate-date'
import { TUserDTOReturnData } from '../../types/user'

export default class UpdateDTO {
	private updatedAt: Date

	constructor(
		private name: string,
		private email: string,
		private phone: number,
		private password: string,
		private image?: string
	) {
		this.name = name
		this.email = email
		this.phone = phone
		this.password = password
		this.image = image
		this.updatedAt = new Date(generateDate())
	}

	public getData(): TUserDTOReturnData {
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
