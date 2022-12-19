import multer from 'multer'
import path from 'path'
import { Request } from 'express'

const multerConfig = multer.diskStorage({
	destination: (req: Request, file, callback) => callback(null, path.resolve(__dirname, '../uploads')),

	filename: (_, file, callback) =>
		callback(
			null,
			`${Date.now()}${Math.floor(Math.random() * 1000)}${path.extname(file.originalname)}`
		),
})

const imageUpload = multer({
	storage: multerConfig,

	fileFilter(_, file, callback) {
		if (!file.originalname.match(/\.(png|jpe?g)$/)) {
			return callback(new Error('Por favor, escolha apenas arquivos PNG ou JP(E)G'))
		}

		return callback(null, true)
	},
})

export default imageUpload
