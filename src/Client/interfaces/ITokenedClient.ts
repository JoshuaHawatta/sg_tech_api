import { Types } from 'mongoose'

type ItokenedClient = {
	_id: Types.ObjectId | string
	name: string
}

export default ItokenedClient
