import { Request, Response } from 'express'
import { login } from '../../../auth'

export const post = (_req: Request, res: Response) => {
	const data = _req.body
	login(data.id, data.message, _req.ip)
		.then(token => {
			res.json({
				token: token
			})
		})
}