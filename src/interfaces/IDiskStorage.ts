import { TFileData, TCallback, TFilterFIleCallback } from '../types/multer'
import { Request } from 'express'

export default interface IDiskStorage {
	destination: (req: Request, file: TFileData, callback: TCallback) => void
	filename: (req: Request, file: TFileData, callback: TCallback) => void
	fileFilter(_: Request, file: TFileData, callback: TFilterFIleCallback): void
}
