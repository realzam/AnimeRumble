import { useContext, useMemo } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Button, Tooltip } from '@mui/material';
import { Box, Stack } from '@mui/system';

import { animeRumbleApi } from '@/api';
import { QuizContext } from '@/context';
import { IQuizQuestion } from '@/interfaces';

interface Props {
	index: number;
	isSelected: boolean;
	isHover: boolean;
}
const QuestionPreviewItemActions = ({
	index,
	isSelected,
	isHover,
}: Props): JSX.Element => {
	const { setIndex, quiz, updateQuestions, setShowDialogDelete, isDragging } =
		useContext(QuizContext);
	const question = quiz.questions[index];

	const { listeners } = useSortable({ id: question.id });
	const showActions = useMemo(
		() => ((isSelected || isHover) && !isDragging ? 'visible' : 'hidden'),
		[isSelected, isHover, isDragging],
	);

	return (
		<Stack direction='column'>
			<Box visibility={showActions}>
				<Tooltip title='Duplicar' arrow placement='right'>
					<Button
						aria-label='copy'
						color='secondary'
						sx={{
							p: 0,
							m: 1,
							minWidth: 0,
						}}
						onClick={async () => {
							const { data } = await animeRumbleApi.put<IQuizQuestion[]>(
								`/quiz/copy-question`,
								{
									quizID: quiz.id,
									questionID: question.id,
								},
							);
							updateQuestions(data);
							setIndex(index + 1);
						}}
					>
						<ContentCopyIcon />
					</Button>
				</Tooltip>
			</Box>
			<Button
				{...listeners}
				disableRipple={true}
				sx={{
					p: 0,
					m: 1,
					minWidth: 0,
					height: '100%',
					cursor: 'grab',
				}}
			>
				<DragIndicatorIcon />
			</Button>
			<Box visibility={showActions}>
				<Tooltip title='Eliminar' arrow placement='right'>
					<Button
						aria-label='delete'
						color='error'
						sx={{
							p: 0,
							m: 1,
							minWidth: 0,
						}}
						onClick={async () => {
							if (quiz.questions.length == 1) {
								setShowDialogDelete(true);
							} else {
								const { data } = await animeRumbleApi.put<IQuizQuestion[]>(
									`/quiz/delete-question`,
									{
										quizID: quiz.id,
										questionID: question.id,
									},
								);
								updateQuestions(data);
							}
						}}
					>
						<DeleteOutlineIcon />
					</Button>
				</Tooltip>
			</Box>
		</Stack>
	);
};

export default QuestionPreviewItemActions;
