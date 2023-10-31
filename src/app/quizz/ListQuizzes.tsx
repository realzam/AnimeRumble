import { useContext } from 'react';
import { QuizContext } from '@/context/quiz';

import { ScrollArea } from '@ui/ScrollArea';

import QuestionItemList from './QuestionItemList';

const ListQuizzes = () => {
	const { quiz, indexQuestionUI } = useContext(QuizContext);
	const { questions } = quiz;
	return (
		<ScrollArea type='always'>
			<div className='px-5 py-4'>
				<div className='text-violet-400'>{`${questions.length} ${
					questions.length === 1 ? 'pregunta' : 'preguntas'
				} `}</div>

				{questions.map((question, index) => (
					<QuestionItemList
						key={question.id}
						question={question}
						index={index}
						selected={index === indexQuestionUI.get()}
					/>
				))}
			</div>
		</ScrollArea>
	);
};

export default ListQuizzes;
