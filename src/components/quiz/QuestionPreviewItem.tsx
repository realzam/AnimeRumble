import { useContext, useMemo, useState } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Badge, Card, useTheme } from '@mui/material';

import QuestionPreviewItemActions from './QuestionPreviewItemActions';
import QuestionPreviewItemInfo from './QuestionPreviewItemInfo';

import { QuizContext } from '@/context';
import { useValidQuestion } from '@/hooks';

interface Props {
	index: number;
}
const QuestionPreviewItem = ({ index }: Props): JSX.Element => {
	const theme = useTheme();
	const { quiz, index: currentQuestion } = useContext(QuizContext);
	const question = quiz.questions[index];

	const isSelected = useMemo(
		() => currentQuestion === index,
		[index, currentQuestion],
	);

	const [isHover, setIsHover] = useState(false);

	const { attributes, setNodeRef, transform, transition } = useSortable({
		id: question.id,
	});
	const { isValidQuizQuestion } = useValidQuestion(question.id);

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<Badge
			color='warning'
			badgeContent='!'
			invisible={isValidQuizQuestion}
			sx={{
				display: 'block',
				'& .MuiBadge-badge': {
					userSelect: 'none',
					top: '50%',
					fontSize: 20,
				},
			}}
			ref={setNodeRef}
			style={style}
			{...attributes}
		>
			<Card
				variant='darken'
				onMouseEnter={() => {
					setIsHover(true);
				}}
				onMouseLeave={() => {
					setIsHover(false);
				}}
				sx={{
					marginY: 2,
					display: 'flex',
					border: '1px solid',
					borderColor: isSelected ? theme.palette.primary.dark : 'transparent',
					// backgroundColor: isSelected ? '#7840232e' : undefined,
				}}
			>
				<QuestionPreviewItemInfo index={index} />
				<QuestionPreviewItemActions
					index={index}
					isHover={isHover}
					isSelected={isSelected}
				/>
			</Card>
		</Badge>
	);
};

export default QuestionPreviewItem;