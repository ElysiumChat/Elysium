import { queryOne, insert, update } from './database'
import { ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'
import config from './config'
import { User } from './types/User'

export interface AuthData {
	user: string;
	hash: string;
}

export interface TokenData {
	user: User;
	timestamp: number;
	lastUse: number;
	ip: string;
}

const tokens = new Map<string,TokenData>()

export const login = (id: string, password: string, ip: string) => {
	return new Promise<string>((resolve, reject) => {
		queryOne('Auth', { user: new ObjectId(id) })
			.then(result => {
				const data = <AuthData>result

				if(!data)return reject('Unknown ID')

				bcrypt.compare(password, data.hash)
					.then(isValid => {
						if (isValid) {
							const token = genToken(data.user)
							queryOne('Users', { _id: data.user })
								.then(result => {
									const user = <User>result
									tokens.set(token, {
										user: user,
										timestamp: Date.now(),
										lastUse: Date.now(),
										ip: ip
									})
									resolve(token)
								})
						} else {
							reject('Incorrect Password')
						}
					})

			})
	})
}

export const register = (id: string, password: string) => {
	return new Promise<void>((resolve) => {
		bcrypt.hash(password, config.bcrypt_rounds)
			.then(hash => {
				insert('Auth', {
					user: id,
					hash: hash
				}).then(() => resolve())
			})
	})
}

export const set = (id: string, password: string) => {
	return new Promise<void>((resolve) => {
		bcrypt.hash(password, config.bcrypt_rounds)
			.then(hash => {
				update('Auth', { user: id }, { hash: hash }).then(() => resolve())
			})
	})
}

export const validateToken = (token: string | undefined) => {
	if(token == undefined)return undefined
	return tokens.get(token)
}

export const invalidateToken = (token: string) => {
	return tokens.delete(token)
}

function genToken(id: string) {
	return id + '.' + new ObjectId()
}