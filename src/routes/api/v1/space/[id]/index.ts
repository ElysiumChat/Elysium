import { Request, Response } from 'express'
import { queryOne } from '../../../../../database'
import { Space } from '../../../../../types/Space'

export const get = (_req: Request, res: Response) => {
	if (!_req.user) return res.status(403).json({
		error: 'Not Authenticated'
	})

	queryOne('Spaces', { _id: _req.params.id })
		.then(space => {
			space = <Space>space
			res.json(space)
		})
}