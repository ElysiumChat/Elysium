import { User } from './User'

export interface Channel {
	id: string;
	type: number;
	members: User[];
	space: string;
}

export interface TextChannel extends Channel {
	encrypted: boolean;
}