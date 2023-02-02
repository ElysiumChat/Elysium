import nodeConfig from 'config'

export interface Config {
	port: number;
	name: string;
	description: string;
	cors: string;
	database: string;
	database_name: string;
	bcrypt_rounds: number;
}

const config: Config = {
	port: nodeConfig.get<number>('port'),
	name: nodeConfig.get<string>('name'),
	description: nodeConfig.get<string>('description'),
	cors: nodeConfig.get<string>('cors'),
	database: nodeConfig.get<string>('database'),
	database_name: nodeConfig.get<string>('database_name'),
	bcrypt_rounds: nodeConfig.get<number>('bcrypt_rounds')
}

export default config