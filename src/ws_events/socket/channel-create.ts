import { Socket } from 'socket.io'
import { v4 as uuidv4 } from 'uuid'
import { create } from '../../channels'

export default async (ws: Socket) => {
	const uuid = uuidv4()
	create(uuid)
	ws.emit('channel-create-ack', uuid)
}