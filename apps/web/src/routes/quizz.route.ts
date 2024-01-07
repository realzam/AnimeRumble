'server-only';

import { env } from '@/env.mjs';
import {
	AddQuestionSchema,
	AsignateQuizSchema,
	AsnwerQuizSchema,
	CreateQuizSchema,
	CreateQuizSchemaAI,
	DeleteQuestionSchema,
	GetAsnwersUser,
	GetQuizSchema,
	ModifiedQuestionSchema,
	ShortQuestionsSchema,
	UpdateQuestionSchema,
	UpdateQuizSchema,
} from '@/schema/quiz';
import {
	adminProcedure,
	publicProcedure,
	router,
	userProcedure,
} from '@/trpc/server/trpc';
import { TRPCError } from '@trpc/server';
import * as schema from 'anime-db';
import { and, asc, eq, inArray, sql, type SQL } from 'drizzle-orm';
import { customAlphabet, urlAlphabet } from 'nanoid';
import { UTApi } from 'uploadthing/server';
import { z } from 'zod';

import { type QuestionType } from '@/types/quizQuery';
import { db } from '@/lib/db';
import { strict_output } from '@/lib/gtp';

const utapi = new UTApi({ apiKey: env.UPLOADTHING_SECRET });

export const quizRouter = router({
	createQuizFromIA: adminProcedure
		.input(CreateQuizSchemaAI)
		.mutation(async (opts) => {
			const { topic } = opts.input;
			const QuizAI = z.object({
				title: z.string().min(1),
				description: z.string().min(1),
				questions: z
					.object({
						question: z.string().min(1),
						questionType: z.enum(['Multiple', 'TF']),
						answers: z.string().array().optional(),
						correctAnswer: z.union([z.boolean(), z.string()]),
					})
					.array(),
			});
			let quizAI: z.infer<typeof QuizAI> = {} as z.infer<typeof QuizAI>;
			for (let t = 0; t < 3; t++) {
				try {
					const res = await strict_output(topic);
					const resParse = JSON.parse(res);
					quizAI = QuizAI.parse(resParse);
					break;
				} catch (error) {
					console.log(error);
					if (t === 2) {
						throw new TRPCError({
							code: 'BAD_REQUEST',
							message: 'error al generar quiz',
						});
					}
				}
			}

			const { title, description, questions } = quizAI;
			const nanoid = customAlphabet(urlAlphabet, 15);

			const idQuiz = nanoid();
			await db.insert(schema.quizzes).values({
				id: idQuiz,
				state: 'draft',
				title,
				description,
			});

			for (let i = 0; i < questions.length; i++) {
				const { question, answers, questionType, correctAnswer } = questions[i];
				const idQuestion = nanoid();

				let ans = ['', '', '', ''];
				const correctAns = [false, false, false, false];
				let correctAnsTF = undefined;

				if (questionType === 'Multiple') {
					if (answers && ans.length === 4) {
						const ok = answers.findIndex(
							(a) => a === (correctAnswer as string),
						);
						if (ok !== -1) {
							ans = answers;
							correctAns[ok] = true;
						}
					}
				} else {
					if (typeof correctAnswer == 'boolean') {
						correctAnsTF = correctAnswer;
					}
				}

				const [hasError, errors] = validateQuestion({
					question,
					questionType,
					correctAnswers: correctAns,
					answers: ans,
					correctAnswerTF: correctAnsTF === undefined ? null : correctAnsTF,
				});

				await db.insert(schema.questions).values({
					id: idQuestion,
					quizId: idQuiz,
					questionType,
					question,
					answers: ans,
					correctAnswers: correctAns,
					correctAnswerTF: correctAnsTF,
					position: i,
					errors,
					hasError,
					modified: true,
				});
			}
			return { idQuiz };
		}),

	createQuizz: adminProcedure.input(CreateQuizSchema).mutation(async (opts) => {
		const values = opts.input;
		const { img, ...props } = values;
		const nanoid = customAlphabet(urlAlphabet, 15);
		const idQuiz = nanoid();
		const idQuestion = nanoid();

		await db.insert(schema.quizzes).values({
			...props,
			id: idQuiz,
			state: 'draft',
			img: img?.url,
			imgKey: img?.key,
		});

		const quiz = await db.query.quizzes.findFirst({
			where: eq(schema.quizzes.id, idQuiz),
		});

		await db.insert(schema.questions).values({
			id: idQuestion,
			questionType: 'Multiple',
			quizId: idQuiz,
			question: '',
			answers: ['', '', '', ''],
			correctAnswers: [false, false, false, false],
			position: 0,
			errors: [
				'Es necesaria una pregunta',
				'Es necesario al menos dos respuestas',
				'Es necesaria al menos una respuesta correcta',
			],
		});
		if (img) {
			await utapi.renameFile({
				fileKey: img.key,
				newName: `QuizPortada-${props.title}-${idQuiz}`,
			});
		}

		return {
			quiz: quiz!,
		};
	}),

	updateQuiz: adminProcedure.input(UpdateQuizSchema).mutation(async (opts) => {
		const values = opts.input;
		const { img, quizId, ...props } = values;
		await db
			.update(schema.quizzes)
			.set({
				...props,
				img: img?.url,
				imgKey: img?.key,
			})
			.where(eq(schema.quizzes.id, quizId));

		if (img) {
			await utapi.renameFile({
				fileKey: img.key,
				newName: `QuizPortada-${props.title}-${quizId}`,
			});
		}
	}),
	getListQuizzes: adminProcedure.query(async () => {
		return await db.query.quizzes.findMany({
			with: {
				questions: {
					columns: {
						quizId: false,
					},
					orderBy: [asc(schema.questions.position)],
				},
			},
		});
	}),
	getQuizz: adminProcedure.input(GetQuizSchema).query(async (opts) => {
		const { input } = opts;
		const quiz = await db.query.quizzes.findMany({
			with: {
				questions: {
					columns: {
						quizId: false,
					},
					orderBy: [asc(schema.questions.position)],
				},
			},
			where: eq(schema.quizzes.id, input.id),
		});
		if (quiz.length === 0) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'No existe el quiz',
			});
		}

		return quiz[0];
	}),
	getQuizPlay: userProcedure.input(GetQuizSchema).query(async (opts) => {
		const { input } = opts;
		const quiz = await db.query.quizzes.findMany({
			with: {
				questions: {
					columns: {
						quizId: false,
					},
					orderBy: [asc(schema.questions.position)],
				},
			},
			where: eq(schema.quizzes.id, input.id),
		});
		if (quiz.length === 0) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'No existe el quiz',
			});
		}

		return quiz[0];
	}),
	deleteQuizz: adminProcedure.input(GetQuizSchema).mutation(async (opts) => {
		const { input } = opts;

		await db
			.delete(schema.questions)
			.where(eq(schema.questions.quizId, input.id));
		const quiz = await db.query.quizzes.findFirst({
			where: eq(schema.quizzes.id, input.id),
		});
		await db.delete(schema.quizzes).where(eq(schema.quizzes.id, input.id));

		if (quiz && quiz.imgKey) {
			await utapi.deleteFiles(quiz.imgKey);
		}
	}),
	addQuestion: adminProcedure
		.input(AddQuestionSchema)
		.mutation(async (opts) => {
			const { id, type = 'Multiple' } = opts.input;
			const quiz = await db.query.quizzes.findFirst({
				with: {
					questions: {
						columns: {
							quizId: false,
						},
					},
				},
				where: eq(schema.quizzes.id, id),
			});
			if (!quiz) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No existe el quiz',
				});
			}
			const nanoid = customAlphabet(urlAlphabet, 15);
			const idQuestion = nanoid();
			await db.insert(schema.questions).values({
				id: idQuestion,
				questionType: type,
				quizId: id,
				question: '',
				answers: ['', '', '', ''],
				correctAnswers: [false, false, false],
				position: quiz.questions.length,
				errors: [
					'Es necesaria una pregunta',
					'Es necesario al menos dos respuestas',
					'Es necesaria al menos una respuesta correcta',
				],
			});

			const res = (await db.query.questions.findFirst({
				where: eq(schema.questions.id, idQuestion),
			}))!;
			return res;
		}),
	updateQuestion: adminProcedure
		.input(UpdateQuestionSchema)
		.mutation(async (opts) => {
			const { input } = opts;
			const {
				quizId,
				questionId,
				answerUpdate,
				correctAnswerUpdate,
				img,
				...values
			} = input;
			let answers = undefined;
			let correctAnswers: boolean[] | undefined = undefined;
			const question = await db.query.questions.findFirst({
				where: and(
					eq(schema.questions.id, questionId),
					eq(schema.questions.quizId, quizId),
				),
			});
			if (!question) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No existe pregunta',
				});
			}
			if (answerUpdate) {
				answers = [...question.answers];
				answers[answerUpdate.index] = answerUpdate.value;
			}

			if (correctAnswerUpdate) {
				correctAnswers = [...question.correctAnswers];
				correctAnswers[correctAnswerUpdate.index] = correctAnswerUpdate.value;
			}
			await db
				.update(schema.questions)
				.set({
					...values,
					answers,
					correctAnswers,
					img: img?.url,
					imgKey: img?.key,
				})
				.where(
					and(
						eq(schema.questions.id, questionId),
						eq(schema.questions.quizId, quizId),
					),
				);
			const final = await db.query.questions.findFirst({
				where: eq(schema.questions.id, questionId),
			});
			if (final) {
				const [hasError, errors] = validateQuestion(final);
				await db
					.update(schema.questions)
					.set({
						hasError,
						errors,
					})
					.where(
						and(
							eq(schema.questions.id, questionId),
							eq(schema.questions.quizId, quizId),
						),
					);
			}
			if (img) {
				if (img.key) {
					await utapi.renameFile({
						fileKey: img.key,
						newName: `Question-${questionId}`,
					});
				}
				if (question.imgKey) {
					await utapi.deleteFiles(question.imgKey);
				}
			}
		}),
	setModifiedQuestion: adminProcedure
		.input(ModifiedQuestionSchema)
		.mutation(async (opts) => {
			const { input } = opts;
			const { questionId } = input;
			const question = await db.query.questions.findFirst({
				where: eq(schema.questions.id, questionId),
			});

			if (question) {
				const [hasError, errors] = validateQuestion(question);
				await db
					.update(schema.questions)
					.set({
						modified: true,
						hasError,
						errors,
					})
					.where(eq(schema.questions.id, questionId));
			}
		}),
	deleteQuestion: adminProcedure
		.input(DeleteQuestionSchema)
		.mutation(async (opts) => {
			const { input } = opts;
			const questions = await db.query.questions.findMany({
				where: and(eq(schema.questions.quizId, input.quizId)),
			});
			if (questions.length >= 2) {
				await db
					.delete(schema.questions)
					.where(eq(schema.questions.id, input.questionId));
			} else {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No se puede eliminar la única pregunta',
				});
			}
		}),
	shortQuestions: adminProcedure
		.input(ShortQuestionsSchema)
		.mutation(async (opts) => {
			const { input } = opts;

			const { quizId, questionId, newPosition } = input;
			const questions = await db.query.questions.findMany({
				where: eq(schema.questions.quizId, quizId),
				orderBy: [asc(schema.questions.position)],
			});
			if (questions.length === 0) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No existe preguntas con el quiz',
				});
			}
			if (questions.length > 1) {
				const current = questions.slice();
				const oldIndex = current.findIndex((q) => q.id === questionId);
				const start =
					newPosition < 0 ? current.length + newPosition : newPosition;

				if (oldIndex == -1) {
					throw new TRPCError({
						code: 'BAD_REQUEST',
						message: 'No existe la pregunta',
					});
				}
				const res = arrayMove(current, oldIndex, newPosition);

				const questionsChanged = current.slice(
					Math.min(start, oldIndex),
					Math.max(start, oldIndex) + 1,
				);

				const finishRes: {
					questionId: string;
					position: number;
				}[] = questionsChanged.map((q) => ({
					questionId: q.id,
					position: res.findIndex((n) => n.id === q.id),
				}));

				if (finishRes.length > 0) {
					const sqlChunks: SQL[] = [];
					const ids: string[] = [];
					// db.update(schema.questions).set().

					sqlChunks.push(sql`(case`);
					for (const element of finishRes) {
						sqlChunks.push(
							sql`when id = ${element.questionId} then ${element.position}`,
						);
						ids.push(element.questionId);
					}
					sqlChunks.push(sql`end)`);
					const finalSql: SQL = sql.join(sqlChunks, sql.raw(' '));

					await db
						.update(schema.questions)
						.set({ position: finalSql })
						.where(inArray(schema.questions.id, ids));
				}
			}
		}),
	asignateQuiz: adminProcedure
		.input(AsignateQuizSchema)
		.mutation(async (opts) => {
			const { input } = opts;

			const { quizId, date } = input;
			const quiz = await db.query.quizzes.findFirst({
				where: and(eq(schema.quizzes.id, quizId)),
				with: {
					questions: {
						columns: {
							quizId: false,
						},
						orderBy: [asc(schema.questions.position)],
					},
				},
			});
			if (!quiz) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No existe el quiz',
				});
			}
			if (quiz.questions.some((q) => q.hasError)) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'El quiz tiene errores',
				});
			}
			await db
				.update(schema.quizzes)
				.set({
					state: 'active',
					endQuiz: date,
				})
				.where(eq(schema.quizzes.id, quizId));
		}),
	getListQuizzesPlayer: publicProcedure.query(async () => {
		return await db.query.quizzes.findMany({
			where: eq(schema.quizzes.state, 'active'),
			with: {
				questions: {
					columns: {
						id: true,
					},
				},
			},
		});
	}),
	answerQuiz: userProcedure.input(AsnwerQuizSchema).mutation(async (opts) => {
		const { questionId, quizId, time, answer } = opts.input;
		const userID = opts.ctx.session.user.id;
		const nanoid = customAlphabet(urlAlphabet, 15);
		const idAns = nanoid();

		const quiz = await db.query.quizzes.findFirst({
			where: eq(schema.quizzes.id, quizId),
			with: {
				questions: true,
			},
		});

		if (!quiz) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'No existe el quiz',
			});
		}

		const question = await db.query.questions.findFirst({
			where: eq(schema.questions.id, questionId),
		});

		if (!question) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'No existe el quiz',
			});
		}
		const order = quiz.questions.findIndex((q) => q.id === questionId);
		let isCorrect = false;
		if (answer !== -1) {
			if (question.questionType === 'Multiple') {
				isCorrect = question.correctAnswers[answer];
			} else {
				isCorrect =
					(answer === 1 && !!question.correctAnswerTF) ||
					(answer === 0 && !question.correctAnswerTF);
			}
		}
		const timeInt = parseInt(question.time) * 100;
		const m = -900 * (time / timeInt);
		let points = Math.max(100, Math.ceil(m + 1000));

		if (question.points === 'double') {
			points *= 2;
		} else if (question.points === 'none') {
			points = 0;
		}
		if (answer !== -1) {
			points = 0;
		}

		await db.insert(schema.answers).values({
			id: idAns,
			quizId,
			questionId,
			user: userID,
			time: `${(time / 100).toFixed(2)}s`,
			points,
			isCorrect,
			order,
		});
		return { ok: true };
	}),

	getAnswerUser: adminProcedure.input(GetAsnwersUser).query(async (opts) => {
		const { quizId, user } = opts.input;
		return db.query.answers.findMany({
			where: and(
				eq(schema.answers.user, user),
				eq(schema.answers.quizId, quizId),
			),
			orderBy: [asc(schema.answers.order)],
		});
	}),
});

const arrayMove = <T>(array: T[], from: number, to: number): T[] => {
	const newArray = array.slice();
	newArray.splice(
		to < 0 ? newArray.length + to : to,
		0,
		newArray.splice(from, 1)[0],
	);

	return newArray;
};

const validateQuestion = (
	q:
		| QuestionType
		| Pick<
				QuestionType,
				| 'question'
				| 'questionType'
				| 'correctAnswers'
				| 'answers'
				| 'correctAnswerTF'
		  >,
): [boolean, string[]] => {
	let hasError = false;
	const errors: string[] = ['', '', ''];

	if (q.question.length === 0) {
		hasError = true;
		errors[0] = 'Es necesaria una pregunta';
	}

	let hasCorrectAnswer = false;

	if (q.questionType === 'TF') {
		hasCorrectAnswer =
			q.correctAnswerTF !== null && q.correctAnswerTF !== undefined;
		if (!hasCorrectAnswer) {
			hasError = true;
			errors[2] = 'Es necesaria seleccionar la respuesta correcta';
		}
	} else {
		if (q.answers.filter((ans) => ans.length > 0).length < 2) {
			errors[1] = 'Es necesario al menos dos respuestas';
			hasError = true;
		}

		hasCorrectAnswer = q.correctAnswers.some((ans) => ans);
		if (!hasCorrectAnswer) {
			hasError = true;
			errors[2] = 'Es necesaria al menos una respuesta correcta';
		}
	}

	return [hasError, errors];
};
