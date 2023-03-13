import { createContext } from 'react';

import { IUser, ResgisterUserContextResponse } from '@/interfaces';

interface ContextProps {
	isLoggedIn: boolean;
	user?: IUser;
	logout: () => void;
	loginUser: (email: string, password: string) => Promise<boolean>;
	registerUser: (
		name: string,
		email: string,
		password: string,
	) => Promise<ResgisterUserContextResponse>;
}

export const AuthContext = createContext({} as ContextProps);
