export type IUserRoles = 'admin' | 'client';

export interface IUser {
	id: string;
	name: string;
	email: string;
	role: IUserRoles;
	createdAt: string;
	updatedAt: string;
}

export interface IUserResponseApi {
	token: string;
	user: {
		name: string;
		email: string;
		role: IUserRoles;
	};
}

export interface IJWTUser {
	id: string;
	email: string;
	role: IUserRoles;
}

export interface ResgisterUserContextResponse {
	hasError: boolean;
	message?: string;
}
