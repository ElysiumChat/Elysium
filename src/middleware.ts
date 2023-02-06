import { Request, Response, NextFunction, Application, json as JsonMiddleware } from 'express'
import { validateToken } from './auth'
import { User } from './types/User'
import CorsMiddleware from 'cors'
import config from './config'

declare module 'express-serve-static-core' {
	interface Request {
		user?: User;
	}
}

export const AuthenticationMiddleware = (req: Request, _res: Response, next: NextFunction) => {
	const tokenData = validateToken(req.headers['authorization'])
	if (!tokenData) {
		req.user = undefined
	} else {
		req.user = <User>tokenData.user	
	}
	next()
}

export default (app: Application) => {
	app.use(JsonMiddleware())
	app.use(AuthenticationMiddleware)
	app.use(CorsMiddleware({
		origin: config.cors
	}))
}