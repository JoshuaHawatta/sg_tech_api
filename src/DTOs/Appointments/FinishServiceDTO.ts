import { TFinishServiceDTOReturnData } from '../../types/appointment'

export default class FinishServiceDTO {
	constructor(private finished: boolean, private deliveredDate: Date) {
		this.finished = finished
		this.deliveredDate = new Date(deliveredDate)
	}

	getDeliveredDate(): Date {
		return this.deliveredDate
	}

	getData(): TFinishServiceDTOReturnData {
		return {
			delivered: { finished: this.finished, deliveredDate: this.deliveredDate },
		}
	}
}
