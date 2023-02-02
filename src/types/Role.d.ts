import { PermissionSet } from './Permission'

export default interface Role {
	name: string;
	color: string;
	position: number;
	permissions: PermissionSet;
}