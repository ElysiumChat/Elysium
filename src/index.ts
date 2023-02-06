import http from 'http'
import { readdir, readFile } from 'fs/promises'
import express from 'express'
import { FsRouter } from 'express-router-filesystem'
import { Server as WSS } from 'socket.io'
import config from './config'
import { PeerServer } from 'peer'
import middleware from './middleware'

const app = express()
const server = http.createServer(app)
const wss = new WSS(server, {
	cors: {
		origin: config.cors,
		methods: ['GET', 'POST']
	}
})
PeerServer({ port: 9000, path: '/' })

middleware(app)

app.get('/app', (_req, res) => {
	readFile(__dirname + '/../client/index.html')
		.then(file => {
			res.setHeader('content-type', 'text/html').send(file)
		})
})

readdir(__dirname + '/ws_events/server')
	.then(files => {
		files.forEach(async file => {
			if (!file.endsWith('.js')) return
			const name = file.split('.js')[0]
			const event = (await import('./ws_events/server/' + file)).default
			wss.on(name, event)
		})
	})

FsRouter(app, {
	routesDir: __dirname + '/routes',
	routePrefix: ''
}).then(() => {
	server.listen(config.port, () => {
		console.info(`Listening on port ${config.port}`)
	})
})

