import multer from 'multer'
import path from 'path'
import DiskStorage from '../entities/DiskStorage'

const { destination, filename, fileFilter } = new DiskStorage(
	(_, __, callback) => callback(null, path.resolve(__dirname, '../uploads') as string),
	(_, file, callback) =>
		callback(
			null,
			`${Date.now()}${Math.floor(Math.random() * 1000)}${path.extname(file.originalname)}`
		)
)

const multerConfig = multer.diskStorage({ destination, filename })
const imageUpload = multer({ storage: multerConfig, fileFilter })

export default imageUpload
