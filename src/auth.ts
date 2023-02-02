import { queryOne, insert, update } from './database'
import { ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'
import config from './config'

export interface AuthData {
	user: string;
	hash: string;
}

export const login = (id: string, password: string) => {
	return new Promise<string>((resolve, reject) => {
		queryOne('Auth', { user: id })
			.then(result => {
				const data = <AuthData>result

				bcrypt.compare(password, data.hash)
					.then(isValid => {
						if (isValid) {
							resolve(genToken(data.user))
						} else {
							reject('Incorrect Password')
						}
					})

			})
	})
}

export const add = (id: string, password: string) => {
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

function genToken(id: string) {
	return id + '.' + new ObjectId()
}