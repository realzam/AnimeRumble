import bcrypt from 'bcryptjs';

import {
	QuizQuestionPoints,
	QuizQuestionTimeLimit,
	QuizQuestionType,
} from '@/interfaces';
import type { IUserRoles } from '@/interfaces/user';

interface SeedUser {
	name: string;
	email: string;
	role: IUserRoles;
	password: string;
}

interface SeedData {
	users: SeedUser[];
	quizzes: SeedQuiz[];
}

interface SeedQuestion {
	type?: QuizQuestionType;
	time?: QuizQuestionTimeLimit;
	points?: QuizQuestionPoints;
	question?: string;
	correctAnswersQuiz?: boolean[];
	correctAnswerTrueFalse?: boolean;
	answers?: string[];
	img?: string;
}
interface SeedQuiz {
	title: string;
	description: string;
	questions: SeedQuestion[];
	createdAt: number;
}

export const initialData: SeedData = {
	quizzes: [
		{
			title: 'Takagi-san',
			description: '1-3 preguntas',
			createdAt: Date.now(),
			questions: [
				{
					question: '¿Cuantas flexiones?',
					answers: ['1', '2', '30', '50'],
					correctAnswersQuiz: [false, false, false, true],
				},
			],
		},
		{
			title: 'Dragon ball',
			description: '1-3 preguntas',
			createdAt: Date.now(),
			questions: [
				{
					question: '¿Cuantos deseo pidio bulma?',
					answers: ['1', '2', '3', 'ninguno'],
					correctAnswersQuiz: [true, false, false, false],
				},
				{
					question: '¿Goku está vivo?',
					type: 'TrueFalse',
					correctAnswerTrueFalse: true,
				},
			],
		},
	],
	users: [
		{
			name: 'Sergio Zamorano',
			email: 'sergio@google.com',
			password: bcrypt.hashSync('123456'),
			role: 'admin',
		},
		{
			name: 'Eduardo Rios',
			email: 'eduardo@google.com',
			password: bcrypt.hashSync('123456'),
			role: 'client',
		},
		{
			name: 'Nino Nakano',
			email: 'nino@google.com',
			password: bcrypt.hashSync('123456'),
			role: 'admin',
		},
	],
};
