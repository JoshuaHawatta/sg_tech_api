type TConfirmedOrDeclieData = {
	confirmedService: boolean
}

export default class ConfirmOrDeclineDTO {
	private confirmedService: boolean

	constructor(confirmedService: boolean) {
		this.confirmedService = confirmedService
	}

	getConfirmedService(): boolean {
		return this.confirmedService
	}

	getData(): TConfirmedOrDeclieData {
		return {
			confirmedService: this.confirmedService,
		}
	}
}
