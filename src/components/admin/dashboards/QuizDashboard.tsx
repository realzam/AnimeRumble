import { useState } from 'react';
import { useRouter } from 'next/router';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import {
	Tabs,
	Tab,
	Card,
	Box,
	Stack,
	Typography,
	Chip,
	Button,
	IconButton,
	Tooltip,
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import useSWR, { Fetcher } from 'swr';

import { IQuiz } from '@/interfaces';

interface Props2 {
	quiz: IQuiz;
}
const QuizItemList = ({ quiz }: Props2): JSX.Element => {
	const router = useRouter();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);

	return (
		<Card
			sx={{
				marginBottom: 2,
			}}
		>
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
								<IconButton onClick={handleClick}>
									<MoreVertIcon />
								</IconButton>
							</Tooltip>
							<Menu
								id='basic-menu'
								MenuListProps={{
									'aria-labelledby': 'basic-button',
								}}
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
							>
								<MenuItem>
									<ListItemIcon>
										<TextFieldsIcon />
									</ListItemIcon>
									<ListItemText>Renombrar</ListItemText>
								</MenuItem>
								<MenuItem>
									<ListItemIcon>
										<ContentCopyIcon />
									</ListItemIcon>
									<ListItemText>Duplicar</ListItemText>
								</MenuItem>
								<MenuItem>
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

const QuizDashboard = (): JSX.Element => {
	const router = useRouter();
	const [tabIndex, setTabIndex] = useState(0);
	const fetcher: Fetcher<IQuiz[]> = (apiURL: string) =>
		fetch(apiURL).then(res => res.json());

	const { data, error, isLoading } = useSWR('/api/quiz', fetcher);

	return (
		<>
			<Stack direction='row' justifyContent='space-between' alignItems='center'>
				<Tabs value={tabIndex} onChange={(e, index) => setTabIndex(index)}>
					<Tab disableRipple label={'Borradores'} />
					<Tab disableRipple label={'En progreso'} />
					<Tab disableRipple label={'Finalizados'} />
				</Tabs>
				<Button
					variant='contained'
					onClick={() => {
						router.push('/admin/quiz/create/');
					}}
				>
					Crear Encuesta
				</Button>
			</Stack>
			{isLoading ? (
				<div>loading...</div>
			) : error ? (
				<div>failed to load</div>
			) : (
				data?.map(quiz => <QuizItemList key={quiz.id} quiz={quiz} />)
			)}
		</>
	);
};

export default QuizDashboard;
