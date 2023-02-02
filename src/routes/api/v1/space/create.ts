import { Request, Response } from 'express'
import { insert } from '../../../../database'
import { Space } from '../../../../types/Space'

export const post = (_req: Request, res: Response) => {
	const data = <Space>_req.body
	insert('Spaces', data)
		.then((space) => {
			res.json(space)
		})
}