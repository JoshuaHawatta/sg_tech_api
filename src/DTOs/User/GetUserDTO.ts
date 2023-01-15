import { Types } from 'mongoose'

type TFieldTypes = string | Types.ObjectId

type TEmailData = { email: string }
type TIdData = { _id: Types.ObjectId }

export default class GetUserDTO {
	private field: TFieldTypes

	constructor(field: TFieldTypes) {
		this.field = field
	}

	public getByField(): TIdData | TEmailData {
		if (Types.ObjectId.isValid(this.field))
			return {
				_id: this.field as Types.ObjectId,
			}

		return {
			email: this.field as string,
		}
	}

	static selectFieldsQuery(): string {
		return 'name email phone appointments accesses'
	}
}
