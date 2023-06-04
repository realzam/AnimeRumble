import bcrypt from 'bcryptjs';

import {
	QuizQuestionPoints,
	QuizQuestionTimeLimit,
	QuizQuestionType,
} from '@/interfaces';
import type { IUserRoles, IUserState } from '@/interfaces/user';

interface SeedUser {
	name: string;
	email: string;
	role: IUserRoles;
	password: string;
	state: IUserState;
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
			title: 'Shigatsu wa kimi no uso',
			description: 'Preguntas de los primeros 3 capítulos',
			createdAt: Date.now(),
			questions: [
				{
					question: '¿Cuantas flexiones?',
					answers: ['1', '2', '30', '50'],
					correctAnswersQuiz: [false, false, false, true],
				},
				{
					question: '¿Cuantas flexiones?',
					answers: ['1', '2', '30', '50'],
					correctAnswersQuiz: [false, false, false, true],
				},
				{
					question: '¿Cuantas flexiones?',
					answers: ['1', '2', '30', '50'],
					correctAnswersQuiz: [false, false, false, true],
				},
				{
					question: '¿Cuantas flexiones?',
					answers: ['1', '2', '30', '50'],
					correctAnswersQuiz: [false, false, false, true],
				},
				{
					question: '¿Cuantas flexiones?',
					answers: ['1', '2', '30', '50'],
					correctAnswersQuiz: [false, false, false, true],
				},
				{
					question: '¿Cuantas flexiones?',
					answers: ['1', '2', '30', '50'],
					correctAnswersQuiz: [false, false, false, true],
				},
				{
					question: '¿Cuantas flexiones?',
					answers: ['1', '2', '30', '50'],
					correctAnswersQuiz: [false, false, false, true],
				},
				{
					question: '¿Cuantas flexiones?',
					answers: ['1', '2', '30', '50'],
					correctAnswersQuiz: [false, false, false, true],
				},
				{
					question: '¿Cuantas flexiones?',
					answers: ['1', '2', '30', '50'],
					correctAnswersQuiz: [false, false, false, true],
				},
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
			role: 'player',
			state: 'no-verified',
		},
		{
			name: 'Eduardo Rios',
			email: 'eduardo@google.com',
			password: bcrypt.hashSync('123456'),
			role: 'player',
			state: 'verified',
		},
		{
			name: 'Nino Nakano',
			email: 'nino@google.com',
			password: bcrypt.hashSync('123456'),
			role: 'admin',
			state: 'verified',
		},
	],
};
