import ClientSchema from '../../Client/ClientSchema'
import ClientController from '../../Client/ClientController'
import IClient from '../../Client/IClient'
import { Request, Response } from 'express'

let req: Request
let res: Response

describe('Client should be able to login when...', () => {
	afterEach(() => jest.clearAllMocks())

	test('When provide a e-mail and password', async () => {
		ClientController.login = jest
			.fn()
			.mockImplementation(() => ({ email: 'randomemail@email.com', password: 'randompassword' }))

		const mockLogin = (await ClientController.login(req, res)) as unknown as IClient

		expect(mockLogin).toHaveProperty('email')
		expect(mockLogin).toHaveProperty('password')
	})
})
