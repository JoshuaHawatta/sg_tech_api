import ClientSchema from '../../src/Client/ClientSchema'
import generateDate from '../../src/helpers/generate-date'
import { Request, Response } from 'express'
import ClientController from '../../src/Client/ClientController'

jest.mock('../../src/Client/ClientController')

let req: Request
let res: Response

type TClient = {
	name: string
	email: string
	password: string
	createdAt: Date
	updatedAt: Date
}

//HAPPY_PATH
describe('Client should be able to create account when...', () => {
	afterEach(() => jest.clearAllMocks())

	test('all fields are are filled', async () => {
		ClientController.registerAccount = jest.fn().mockImplementationOnce(() => ({
			name: 'randomUser',
			email: 'randomuser@gmail.com',
			password: 'randompassword',
			createdAt: generateDate(),
			updatedAt: generateDate(),
		}))

		const mockedNewUser = await ClientController.registerAccount(req, res)
		const confirmPassword = 'randompassword'

		const mockedUserToInsert = new ClientSchema(mockedNewUser)

		expect(mockedNewUser).toHaveProperty('name')
		expect(mockedNewUser).toHaveProperty('email')
		expect(mockedNewUser).toHaveProperty('password')
		expect(confirmPassword).not.toBe('')
		expect(mockedNewUser).toHaveProperty('createdAt')
		expect(mockedNewUser).toHaveProperty('updatedAt')

		mockedUserToInsert.save = jest.fn().mockImplementation(() => ({}))
		mockedUserToInsert.save()
	})

	test('when passwords are equal', async () => {
		ClientController.registerAccount = jest.fn().mockImplementationOnce(() => ({
			name: 'randomUser',
			email: 'randomuser@gmail.com',
			password: 'randompassword',
			createdAt: generateDate(),
			updatedAt: generateDate(),
		}))

		const mockedNewUser = (await ClientController.registerAccount(req, res)) as unknown as TClient
		const confirmPassword = 'randompassword'

		expect(mockedNewUser).toHaveProperty('name')
		expect(mockedNewUser).toHaveProperty('email')
		expect(mockedNewUser).toHaveProperty('password')
		expect(confirmPassword).not.toBe('')
		expect(confirmPassword).toStrictEqual(mockedNewUser.password)
		expect(mockedNewUser).toHaveProperty('createdAt')
		expect(mockedNewUser).toHaveProperty('updatedAt')

		const mockedUserToInsert = new ClientSchema(mockedNewUser)

		mockedUserToInsert.save = jest.fn().mockImplementation(() => ({}))
		mockedUserToInsert.save()
	})

	test('Has no user registered with choosen e-mail', async () => {
		ClientSchema.findOne = jest.fn().mockReturnValueOnce({
			name: 'randomUser',
			email: 'mockeduser@gmail.com',
		})

		ClientController.registerAccount = jest
			.fn()
			.mockImplementationOnce(() => ({ name: 'randomUser', email: 'randomuser@email.com' }))

		const mockedDBUser = await ClientSchema.findOne()
		const signedUser = await ClientController.registerAccount(req, res)

		expect(signedUser).not.toStrictEqual(mockedDBUser)
	})
})

//UNHAPPY_PATH
// describe('Client should NOT be able to create account when...', () => {
// 	//CREATE_TESTS_FOR_THE_'FAILING'_ATTEMPTS...
// })
