import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

const mongoDBConnect = async (): Promise<void> => {
	try {
		await mongoose.connect(process.env.MONGO_URL as string)
		console.log('Conexão ao MongoDB Atlas gerada')
	} catch (err) {
		console.log('Conexão ao MongoDB Atlas mal-sucedida')
	}
}

export default mongoDBConnect
