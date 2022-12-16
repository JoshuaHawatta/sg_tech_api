import ClientSchema from '../../Client/ClientSchema'
import generateDate from '../../helpers/generate-date'
import { Request, Response } from 'express'
import ClientController from '../../Client/ClientController'

//MOCKS
jest.mock('../../Client/ClientController')

type TClient = {
	name: string
	email: string
	password: string
	createdAt: Date
	updatedAt: Date
}

let req: Request
let res: Response

//HAPPY_PATH
describe('Client should be able to create account when...', () => {
	afterEach(() => jest.clearAllMocks())

	test('all fields are are filled', async () => {
		ClientController.registerAccount = jest.fn().mockImplementationOnce(() => ({
			name: 'randomUser',
			email: 'randomuser@email.com',
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
			email: 'randomuser@email.com',
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
			email: 'mockeduser@email.com',
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
describe('Client should NOT be able to create account when...', () => {
	afterEach(() => jest.clearAllMocks())

	test('Does not provide a name', async () => {
		ClientController.registerAccount = jest.fn().mockImplementationOnce(() => {
			const name = null || undefined

			if (!name) throw new Error('Nome obrigatório')
		})

		expect(ClientController.registerAccount).toThrowError('Nome obrigatório')
	})

	test('Does not provide a e-mail', async () => {
		ClientController.registerAccount = jest.fn().mockImplementationOnce(() => {
			const email = null || undefined

			if (!email) throw new Error('E-mail obrigatório')
		})

		expect(ClientController.registerAccount).toThrowError('E-mail obrigatório')
	})

	test('Does not provide a phone', async () => {
		ClientController.registerAccount = jest.fn().mockImplementationOnce(() => {
			const phone = null || undefined

			if (!phone) throw new Error('Telefone obrigatório')
		})

		expect(ClientController.registerAccount).toThrowError('Telefone obrigatório')
	})

	test('Does not provide a password', async () => {
		ClientController.registerAccount = jest.fn().mockImplementationOnce(() => {
			const password = null || undefined

			if (!password) throw new Error('Senha obrigatória')
		})

		expect(ClientController.registerAccount).toThrowError('Senha obrigatória')
	})

	test('Does not provide a confirmPassword', async () => {
		ClientController.registerAccount = jest.fn().mockImplementationOnce(() => {
			const confirmPassword = null || undefined

			if (!confirmPassword) throw new Error('Confirme sua senha')
		})

		expect(ClientController.registerAccount).toThrowError('Confirme sua senha')
	})

	test('Password and confirmPassword are not equal', async () => {
		const [password, confirmPassword] = ['password123', '123password']

		const unmatchedPassowrds = () => {
			if (password !== confirmPassword) throw new Error('As senhas não estão iguais!')
		}

		expect(unmatchedPassowrds).toThrowError('As senhas não estão iguais!')
	})

	test('When it already has a user with the choosen e-mail', async () => {
		ClientSchema.findOne = jest.fn().mockReturnValueOnce({
			name: 'randomUser',
			email: 'mockeduser@email.com',
		})

		ClientController.registerAccount = jest
			.fn()
			.mockImplementationOnce(() => ({ name: 'randomUser', email: 'mockeduser@email.com' }))

		const mockedDBUser = await ClientSchema.findOne()
		const signedUser = (await ClientController.registerAccount(req, res)) as unknown as TClient

		const checkIfUserExistsOnDb = () => {
			if (mockedDBUser?.email === signedUser.email)
				throw new Error('Este e-mail já está sendo usado!')
		}

		expect(checkIfUserExistsOnDb).toThrowError('Este e-mail já está sendo usado!')
	})
})
