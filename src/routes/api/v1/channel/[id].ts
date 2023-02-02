import { Request, Response } from 'express'
import { queryOne } from '../../../../database'
import { Channel } from '../../../../types/Channel'

export const get = (_req: Request, res: Response) => {
	queryOne('Channels', { _id: _req.params.id })
		.then(channel => {
			channel = <Channel>channel
			res.json(channel)
		})
}