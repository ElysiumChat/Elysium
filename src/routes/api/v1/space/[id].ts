import { Request, Response } from 'express'
import { queryOne } from '../../../../database'
import {Space} from '../../../../types/Space'

export const get = (_req: Request, res: Response) => {
	queryOne('Spaces', { _id: _req.params.id })
		.then(space => {
			space = <Space>space
			res.json(space)
		})
}