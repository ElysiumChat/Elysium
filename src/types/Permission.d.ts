export type Permission = string

export interface PermissionSet {
	type?: string;
	allow: Permission[];
	deny: Permission[];
}

export const DefaultPermissionSet: PermissionSet = {
	allow: [
		'SEND_MESSAGE'
	],
	deny: [
		'TEST'
	]
}