const rooms: Record<string, string[]> = {}

export const create = (uuid: string) => {
	rooms[uuid] = []
}

export const join = (uuid: string, user: string) => {
	rooms[uuid].push(user)
}

export const leave = (uuid: string, user: string) => {
	rooms[uuid] = rooms[uuid].filter(x => x != user)
}