import { Types } from 'mongoose'

interface IUserMainData {
	_id: Types.ObjectId
	accesses: ['Client', 'Seller'?]
	name: string
	email: string
	phone: number
}

export default IUserMainData
