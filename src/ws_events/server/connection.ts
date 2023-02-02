import { Socket } from 'socket.io'
import { readdir } from 'fs/promises'

export default (ws: Socket) => {

	ws.join('testchannel')
	
	readdir(__dirname + '/../socket')
		.then(files => {
			files.forEach(async file => {
				if (!file.endsWith('.js')) return
				const name = file.split('.js')[0]
				const event = (await import('../socket/' + file)).default
				ws.on(name, event.bind(null, ws))
			})
		})
}