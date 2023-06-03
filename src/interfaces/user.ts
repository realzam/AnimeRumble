export type IUserRoles = 'admin' | 'player';

export type IUserState = 'no-verified' | 'verified';
export interface IUser {
	id: string;
	name: string;
	email: string;
	role: IUserRoles;
	state: IUserState;
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

export interface ResgisterUserContextResponse {
	hasError: boolean;
	message?: string;
}
