type TFindConfirmedAppointmentsData = {
	confirmedService: boolean
	'delivered.finished': boolean
}

export default class FindConfirmedAppointmentsDTO {
	private confirmedService: boolean
	private finished: boolean

	constructor() {
		this.confirmedService = true
		this.finished = false
	}

	public getData(): TFindConfirmedAppointmentsData {
		return {
			confirmedService: this.confirmedService,
			'delivered.finished': this.finished,
		}
	}
}
