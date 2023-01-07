import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

const getValidationsResults = (req: Request, res: Response, next: NextFunction): Response | void => {
	const results = validationResult(req).array()

	if (results.length > 0) return res.status(422).json({ message: results[0].msg })

	return next()
}

export default getValidationsResults
