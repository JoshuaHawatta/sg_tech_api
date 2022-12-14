const accDate = new Date()

const generateDate = (): number =>
	Date.UTC(
		accDate.getFullYear(),
		accDate.getMonth(),
		accDate.getDate(),
		accDate.getHours(),
		accDate.getMinutes(),
		accDate.getSeconds(),
		accDate.getMilliseconds()
	)

export default generateDate
