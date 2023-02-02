import { Socket } from 'socket.io'
import { join, leave } from '../../channels'

interface JoinData {
	channel: string;
	user: string;
}

export default async (ws: Socket, data: JoinData) => {
	ws.join(data.channel)
	const participants = join(data.channel, data.user)
	ws.emit('channel-join-ack', {
		channel: data.channel,
		participants: participants
	})
	ws.on('disconnect', () => {
		leave(data.channel, data.user)
		ws.to(data.channel).emit('channel-leave', data.user)
	})
}