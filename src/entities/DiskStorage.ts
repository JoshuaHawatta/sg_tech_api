import { TDestination, TFileName, TFilterFIleCallback, TFileData } from '../types/multer'
import IDiskStorage from '../interfaces/IDiskStorage'
import { Request } from 'express'

export default class DiskStorage implements IDiskStorage {
	constructor(public destination: TDestination, public filename: TFileName) {
		this.destination = destination
		this.filename = filename
	}

	fileFilter(_: Request, file: TFileData, callback: TFilterFIleCallback) {
		if (!file.originalname.match(/\.(png|jpe?g)$/))
			return callback(new Error('Por favor, escolha apenas arquivos PNG ou JP(E)G'))

		return callback(null, true)
	}

	public getDestination(): TDestination {
		return this.destination
	}
}
