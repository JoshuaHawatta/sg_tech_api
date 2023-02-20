import { Types } from 'mongoose'
import { TUserMainData } from './user'

//APPOINTMENTS_GETTERS
export type TGetAllAppointmentData = { 'client._id': Types.ObjectId }

export type TGetEspecificAppointmentData = {
	_id: Types.ObjectId | string
	'client._id': Types.ObjectId
}

//DELIVERED_STATUS
export type TDelivered = {
	deliveredDate?: Date
	finished: boolean
}

export type TFindConfirmedAppointmentsData = {
	confirmedService: boolean
	'delivered.finished': boolean
}

//DTOs
export type TAddAppointmentDTO = {
	serviceType: string
	appointmentDate: Date
	client: TUserMainData
	delivered: TDelivered
}

export type TConfirmedOrDeclineDTOReturnData = { confirmedService: boolean }
export type TFinishServiceDTOReturnData = { delivered: TDelivered }
