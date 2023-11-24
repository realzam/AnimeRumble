'use client';

import usePlayQuiz from '@/hooks/usePlayQuiz';
import { Card } from '@ui/Card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@ui/Table';

const SummaryQuestionsList = () => {
	const { questions, answersUser } = usePlayQuiz();
	return (
		<Card>
			<Table className='m-4'>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[10px]'>No.</TableHead>
						<TableHead>Question & Correct Answer</TableHead>
						<TableHead>Your Answer</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<>
						{questions.map((question, index) => {
							return (
								<TableRow key={question.id}>
									<TableCell className='font-medium'>{index + 1}</TableCell>
									<TableCell>
										{question.question} <br />
										<br />
										{question.questionType === 'TF' ? (
											<span className='font-semibold'>
												{question.correctAnswerTF ? 'Verdadero' : 'Falso'}
											</span>
										) : (
											<>
												{question.answers.map(
													(ans, i) =>
														question.correctAnswers[i] && (
															<>
																<span className='font-semibold'>{ans}</span>
																<br />
															</>
														),
												)}
											</>
										)}
									</TableCell>

									<TableCell className={`font-semibold`}>
										{question.questionType === 'TF' ? (
											<>
												{answersUser.get()[index].answerTF
													? 'Verdadero'
													: 'False'}
											</>
										) : (
											<>
												{answersUser.get()[index].answer! >= 0
													? question.answers[answersUser.get()[index].answer!]
													: '-'}
											</>
										)}
									</TableCell>
								</TableRow>
							);
						})}
					</>
				</TableBody>
			</Table>
		</Card>
	);
};

export default SummaryQuestionsList;
