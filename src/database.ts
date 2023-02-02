import { MongoClient as client, Db, ObjectId, Document } from 'mongodb'
import config from './config'

let database: Db

client.connect(config.database)
	.then(client => {
		database = client.db(config.database_name)
	})

/**
 * @typedef Document
 * Object containing the values of a document
 */

/**
 * Finds all the documents matching a query
 * @example
 * query('Users', {name: 'John'})
 * 		.then(users => {
 * 			console.log(users[0].surname)
 * 		})
 * @param {string} collection - Name of the collection to query
 * @param {object} query - Query object 
 * @returns {Promise.<object[]>}
 */
export const query = (collection: string, query: Document) => {
	return new Promise<object[]>((resolve, reject) => {
		if(query._id)query._id = new ObjectId(query._id)
		database.collection(collection).find(query).toArray()
			.then(result => {
				resolve(result)
			})
			.catch(err => {
				reject(err)
			})
	})
}

/**
 * Finds one document matching a query
 * @example
 * queryOne('Users', {name: 'John'})
 * 		.then(user => {
 * 			console.log(user.surname)
 * 		})
 * @param {string} collection - Name of the collection to query
 * @param {object} query - Query object 
 * @returns {Promise<Document>} Document
 */
export const queryOne = (collection: string, query: Document) => {
	return new Promise<object>((resolve, reject) => {
		if (query._id) query._id = new ObjectId(query._id)
		database.collection(collection).findOne(query)
			.then(result => {
				resolve(<object>result)
			})
			.catch(err => {
				reject(err)
			})
	})
}

export const insert = (collection: string, document: object) => {
	return new Promise<object>((resolve, reject) => {
		database.collection(collection).insertOne(document)
			.then(() => {
				resolve(document)
			})
			.catch(err => {
				reject(err)
			})
	})
}

export const update = (collection: string, query: Document, document: Document) => {
	return new Promise<void>((resolve, reject) => {
		database.collection(collection).updateOne(query, document)
			.then(() => {
				resolve()
			})
			.catch(err => {
				reject(err)
			})
	})
}