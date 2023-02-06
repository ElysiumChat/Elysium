import { Request, Response } from 'express'
import { insert } from '../../../../database'
import { Space } from '../../../../types/Space'

export const post = (_req: Request, res: Response) => {
	if (!_req.user) return res.status(403).json({
		error: 'Not Authenticated'
	})
	const user = _req.user

	const data = <Space>_req.body

	if(!data.name)data.name = `${user.name}'s Space`

	insert('Spaces', data)
		.then((space) => {
			res.json(space)
		})
}