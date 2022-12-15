type TFakeClientType = {
	name?: string
	email?: string
	phone?: number
	password?: string
	confirmPassword?: string
}

export default class FakeClientController {
	async registerAccount(client: TFakeClientType) {
		return { ...client }
	}
}
