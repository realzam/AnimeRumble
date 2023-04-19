import { useState } from 'react';
import { useRouter } from 'next/router';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import {
	Card,
	Stack,
	Box,
	Chip,
	Typography,
	Tooltip,
	IconButton,
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText,
	Button,
} from '@mui/material';

import CloneDialog from './CloneDialog';
import DeleteDialog from './DeleteDialog';
import RenameDialog from './RenameDialog';

import { IQuiz } from '@/interfaces';
interface Props {
	quiz: IQuiz;
}

const QuizItemList = ({ quiz }: Props): JSX.Element => {
	const router = useRouter();
	const [showRenameDialog, setShowRenameDialog] = useState(false);
	const [showCloneDialog, setShowCloneDialog] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const openMenu = Boolean(anchorEl);
	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};
	const handleRenameClick = () => {
		handleMenuClose();
		setShowRenameDialog(true);
	};
	const handleCloneClick = () => {
		handleMenuClose();
		setShowCloneDialog(true);
	};
	const handleDeleteClick = () => {
		handleMenuClose();
		setShowDeleteDialog(true);
	};

	return (
		<Card
			sx={{
				marginBottom: 2,
			}}
		>
			<RenameDialog
				quizID={quiz.id}
				title={quiz.title}
				show={showRenameDialog}
				setShowDialog={setShowRenameDialog}
			/>
			<CloneDialog
				quizID={quiz.id}
				title={quiz.title}
				show={showCloneDialog}
				setShowDialog={setShowCloneDialog}
			/>
			<DeleteDialog
				quizID={quiz.id}
				title={quiz.title}
				show={showDeleteDialog}
				setShowDialog={setShowDeleteDialog}
			/>
			<Stack direction='row'>
				<Box
					sx={{
						height: '130px',
						width: '250px',
						backgroundColor: 'black',
						position: 'relative',
					}}
				>
					<Chip
						label={`${quiz.questions.length} preguntas`}
						color='primary'
						sx={{
							position: 'absolute',
							bottom: 10,
							right: 10,
						}}
					/>
				</Box>
				<Stack
					direction='column'
					justifyContent='space-between'
					alignItems='flex-start'
					sx={{
						// padding: 0,
						margin: '10px 15px',
						width: '100%',
					}}
				>
					<Stack
						direction='row'
						justifyContent='space-between'
						alignItems='center'
						sx={{
							width: '100%',
						}}
					>
						<Box>
							<Typography variant='h6'>{quiz.title}</Typography>
						</Box>
						<Box>
							<Tooltip title='Editar'>
								<IconButton
									onClick={() => {
										router.push('/admin/quiz/create/' + quiz.id);
									}}
								>
									<EditIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title='Más'>
								<IconButton onClick={handleMenuClick}>
									<MoreVertIcon />
								</IconButton>
							</Tooltip>
							<Menu
								id='basic-menu'
								MenuListProps={{
									'aria-labelledby': 'basic-button',
								}}
								anchorEl={anchorEl}
								open={openMenu}
								onClose={handleMenuClose}
							>
								<MenuItem onClick={handleRenameClick}>
									<ListItemIcon>
										<TextFieldsIcon />
									</ListItemIcon>
									<ListItemText>Renombrar</ListItemText>
								</MenuItem>
								<MenuItem onClick={handleCloneClick}>
									<ListItemIcon>
										<ContentCopyIcon />
									</ListItemIcon>
									<ListItemText>Duplicar</ListItemText>
								</MenuItem>
								<MenuItem onClick={handleDeleteClick}>
									<ListItemIcon>
										<DeleteOutlineIcon />
									</ListItemIcon>
									<ListItemText>Eliminar</ListItemText>
								</MenuItem>
							</Menu>
						</Box>
					</Stack>
					<Stack direction='row' spacing={1}>
						<Button variant='outlined'>Asignar</Button>
						<Button>Empezar</Button>
					</Stack>
				</Stack>
			</Stack>
		</Card>
	);
};

export default QuizItemList;
