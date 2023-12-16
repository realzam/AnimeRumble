import { type JWTPayload } from 'jose';

export interface JwtAnimePlayer extends JWTPayload {
	role: 'player' | 'admin';
	nick: string;
	id: string;
	typeUser: 'register' | 'guest';
}
