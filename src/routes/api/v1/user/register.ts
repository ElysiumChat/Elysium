import { Request, Response } from 'express'
import { insert } from '../../../../database'
import { User } from '../../../../types/User'

export const get = (_req: Request, res: Response) => {
	const user = <User>_req.body

	if (
		!user.name ||
		!user.pubkey ||
		!user.type
	) {
		res.status(400).json({
			error: 'Not enough data'
		})
		return
	}

	insert('Users', user)
		.then(user => {
			res.json(user)
		})
}