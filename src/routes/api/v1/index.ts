import { Request, Response } from 'express'
import config from '../../../config'
import { VERSION } from '../../../constants'

export const get = (_req: Request, res: Response) => {
	res.json({
		name: config.name,
		version: VERSION
	})
}