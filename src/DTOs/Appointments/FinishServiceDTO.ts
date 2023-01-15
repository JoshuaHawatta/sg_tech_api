type TFinishServiceData = {
	delivered: {
		finished: boolean
		deliveredDate: Date
	}
}

export default class FinishServiceDTO {
	private finished: boolean
	private deliveredDate: Date

	constructor(finished: boolean, deliveredDate: Date) {
		this.finished = finished
		this.deliveredDate = new Date(deliveredDate)
	}

	getDeliveredDate(): Date {
		return this.deliveredDate
	}

	getData(): TFinishServiceData {
		return {
			delivered: {
				finished: this.finished,
				deliveredDate: this.deliveredDate,
			},
		}
	}
}
