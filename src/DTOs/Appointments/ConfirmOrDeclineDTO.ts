import { TConfirmedOrDeclineDTOReturnData } from '../../types/appointment'

export default class ConfirmOrDeclineDTO {
	constructor(private confirmedService: boolean) {
		this.confirmedService = confirmedService
	}

	getConfirmedService(): boolean {
		return this.confirmedService
	}

	getData(): TConfirmedOrDeclineDTOReturnData {
		return { confirmedService: this.confirmedService }
	}
}
