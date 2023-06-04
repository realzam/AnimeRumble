import { IUserRoles } from './user';

export interface IJWTUser {
	id: string;
	email: string;
	role: IUserRoles;
}

export interface IJWTUserID {
	userId: string;
}
