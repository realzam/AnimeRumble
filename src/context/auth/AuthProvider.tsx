import { useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';

import { isAxiosError } from 'axios';
import Cookies from 'js-cookie';

import { AuthContext, authReducer } from './';

import { animeRumbleApi } from '@/api';
import { IUser, ResgisterUserContextResponse } from '@/interfaces';

interface Props {
	children: JSX.Element | JSX.Element[];
}

export interface AuthState {
	isLoggedIn: boolean;
	user?: IUser;
}

const Auth_INITIAL_STATE: AuthState = {
	isLoggedIn: false,
	user: undefined,
};

export const AuthProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);
	const router = useRouter();

	useEffect(() => {
		checkToken();
	}, []);

	const checkToken = async () => {
		try {
			const { data } = await animeRumbleApi.get('/user/valid-token');
			const { token, user } = data;
			Cookies.set('token', token);
			dispatch({ type: 'Auth.Login', payload: user });
		} catch (error) {
			Cookies.remove('token');
		}
	};

	const loginUser = async (
		email: string,
		password: string,
	): Promise<boolean> => {
		try {
			const { data } = await animeRumbleApi.post('/user/login', {
				email,
				password,
			});
			const { token, user } = data;
			Cookies.set('token', token);
			dispatch({ type: 'Auth.Login', payload: user });
			return true;
		} catch (error) {
			// dispatch('')
			return false;
		}
	};

	const registerUser = async (
		name: string,
		email: string,
		password: string,
	): Promise<ResgisterUserContextResponse> => {
		// if (!Cookies.get('token')) {
		// 	return {
		// 		hasError: false,
		// 	};
		// }
		try {
			const { data } = await animeRumbleApi.post('/user/register', {
				email,
				password,
				name,
			});
			const { token, user } = data;
			Cookies.set('token', token);
			dispatch({ type: 'Auth.Login', payload: user });
			return {
				hasError: false,
			};
		} catch (error) {
			if (isAxiosError(error)) {
				return {
					hasError: true,
					message: error.response?.data.message,
				};
			}
			return {
				hasError: true,
				message: 'No se pudo crear el usuario',
			};
		}
	};

	const logout = () => {
		Cookies.remove('token');
		router.reload();
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				loginUser,
				registerUser,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
