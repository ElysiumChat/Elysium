import { Request, Response } from 'express'
import { login } from '../../../../../auth'

interface LoginPayload {
	password: string;
}

export const post = (_req: Request, res: Response) => {
	const data = <LoginPayload>_req.body

	if (
		!data.password
	) {
		res.status(400).json({
			error: 'Not enough data'
		})
		return
	}

	login(_req.params.id, data.password, <string>_req.headers['x-forwarded-for'] || _req.ip)
		.then(token => {
			res.json({
				token: token
			})
		})
		.catch(err => {
			res.status(403).json({
				error: err
			})
		})
}