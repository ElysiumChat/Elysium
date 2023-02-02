import { Socket } from 'socket.io'
import {Message} from '../../types/Message'

export default async (ws: Socket, message: Message) => {
	ws.to('testchannel').emit('message-receive', message)
	ws.emit('message-receive', message)
}