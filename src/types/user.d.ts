import { Types } from 'mongoose'

//USERS_GETTERS
export type TUserMainData = {
	_id: Types.ObjectId
	accesses: ['Client', 'Seller'?]
	name: string
	email: string
	phone: number
}

//DTOs
export type TUserDTOReturnData = {
	name: string
	email: string
	phone: number
	password: string
	image?: string
	createdAt?: Date
	updatedAt: Date
}

//TO_GET_A_USER_FROM_ID_OR_EMAIL_AT_DTO
export type TUserDTOChoosedField = string | Types.ObjectId
export type TUserGetByFieldData = { _id: Types.ObjectId } | { email: string }
