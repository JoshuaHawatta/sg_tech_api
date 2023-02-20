import { Types } from 'mongoose'
import { TUserDTOChoosedField, TUserGetByFieldData } from '../../types/user'

export default class GetUserDTO {
	constructor(private field: TUserDTOChoosedField) {
		this.field = field
	}

	public getByField(): TUserGetByFieldData {
		if (Types.ObjectId.isValid(this.field)) return { _id: this.field as Types.ObjectId }

		return { email: this.field as string }
	}

	static selectFieldsQuery(): string {
		return 'name email phone appointments accesses'
	}
}
