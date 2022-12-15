import ClientSchema from '../../src/Client/ClientSchema'
import generateDate from '../../src/helpers/generate-date'
import FakeClientController from '../../src/fakes/FakeClientController'

describe('Client should be able to create account when...', () => {
	afterEach(() => jest.clearAllMocks())

	test('all fields are are filled', async () => {
		ClientSchema.findOne = jest.fn().mockReturnValueOnce({
			name: 'Emiliano Azevedo',
			email: 'emilianoazevedo@gmail.com',
			password: 'ivorycoast1972',
			createdAt: generateDate(),
			updatedAt: generateDate(),
		})

		const fakeClient = await ClientSchema.findOne()
		const confirmPassword = 'ivorycoast1972'

		expect(fakeClient).toHaveProperty('name')
		expect(fakeClient).toHaveProperty('email')
		expect(fakeClient).toHaveProperty('password')
		expect(confirmPassword).not.toBe('')
		expect(fakeClient).toHaveProperty('createdAt')
		expect(fakeClient).toHaveProperty('updatedAt')
	})

	test('when passwords are equal', async () => {
		ClientSchema.findOne = jest.fn().mockReturnValueOnce({
			name: 'Emiliano Azevedo',
			email: 'emilianoazevedo@gmail.com',
			password: 'ivorycoast1972',
			createdAt: generateDate(),
			updatedAt: generateDate(),
		})

		const fakeClient = await ClientSchema.findOne()
		const confirmPassword = 'ivorycoast1972'

		expect(fakeClient).toHaveProperty('name')
		expect(fakeClient).toHaveProperty('email')
		expect(fakeClient).toHaveProperty('password')
		expect(confirmPassword).not.toBe('')
		expect(fakeClient?.password).toStrictEqual(confirmPassword)
		expect(fakeClient).toHaveProperty('createdAt')
		expect(fakeClient).toHaveProperty('updatedAt')
	})

	test('when the email is not beeing used', async () => {
		ClientSchema.findOne = jest.fn().mockReturnValueOnce({ email: 'emilianoazevedo@gmail.com' })
		const clientController = new FakeClientController()

		const mockedRegisteredClient = await ClientSchema.findOne()

		const newClientEmail = await clientController.registerAccount({
			email: 'newUser@gmail.com',
		})

		expect(newClientEmail).not.toStrictEqual(mockedRegisteredClient)
	})
})
