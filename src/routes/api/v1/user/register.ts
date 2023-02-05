import { Request, Response } from 'express'
import { insert } from '../../../../database'
import { register } from '../../../../auth'

interface RegisterPayload {
	name: string;
	bot: boolean;
	password: string;
}

export const post = (_req: Request, res: Response) => {
	const data = <RegisterPayload>_req.body

	if (
		!data.name ||
		data.bot == undefined ||
		!data.password
	) {
		res.status(400).json({
			error: 'Not enough data'
		})
		return
	}

	insert('Users', {
		name: data.name,
		bot: data.bot
	})
		.then(user => {
			register(user._id, data.password)
			res.json(user)
		})
}