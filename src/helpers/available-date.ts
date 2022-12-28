const checkAvailabeDate = (exists: Date, wished: Date): boolean => {
	const existingDate = `${
		exists.getMonth() + 1
	} ${exists.getDate()} ${exists.getHours()}:${exists.getMinutes()}`

	const wishedDate = `${
		wished.getMonth() + 1
	} ${wished.getDate()} ${wished.getHours()}:${wished.getMinutes()}`

	return existingDate === wishedDate ? true : false
}

export default checkAvailabeDate
