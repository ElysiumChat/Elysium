export interface User {
	_id: string;
	node: string;
	bot: boolean;
	name: string;
	avatar: string;
	spaces: string[];
}

export interface BotUser extends User {
	homepage: string;
}