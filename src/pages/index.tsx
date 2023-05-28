import { useRouter } from 'next/router';

import { Box, Card, CardActionArea, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import styles from '../styles/GameCard.module.css';

import QuizIcon from '@/components/icons/QuizIcon';
import { MainLayout } from '@/layouts';

export default function Home() {
	return (
		<>
			<MainLayout title='Anime Rumble'>
				<Box sx={{ flexGrow: 1 }}>
					<Grid
						container
						spacing={{ xs: 2, md: 3 }}
						columns={{ xs: 4, sm: 8, md: 12 }}
					>
						<GameCard
							title='Quizzes'
							classColor={styles.quizResources}
							icon={<QuizIcon />}
							route='/quizzes'
						/>
						<GameCard
							title='Lotería'
							classColor={styles.loteriaResources}
							icon={<QuizIcon />}
						/>
						<GameCard
							title='Bingo'
							classColor={styles.bingoResources}
							icon={<QuizIcon />}
						/>
						{/* <GameCard
							title='Anime Rumble'
							classColor={styles.animeResources}
							icon={<QuizIcon />}
						/>
						<GameCard
							title='Comentarios'
							classColor={styles.comentariosResources}
							icon={<QuizIcon />}
						/>
						<GameCard
							title='Avisos'
							classColor={styles.avisosResources}
							icon={<QuizIcon />}
						/> */}
					</Grid>
				</Box>
			</MainLayout>
		</>
	);
}

interface Props {
	title: string;
	icon: JSX.Element;
	classColor: string;
	route?: string;
}

const GameCard = ({ title, icon, classColor, route }: Props): JSX.Element => {
	const router = useRouter();
	return (
		<Grid xs={4} sm={4}>
			<Card className={`${classColor} ${styles.container}`}>
				<CardActionArea
					onClick={() => {
						if (route) {
							router.push(route);
						}
					}}
					className={styles.card}
					sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}
				>
					<Box className={styles.circle}>
						<Box className={styles.overlay} />
						{icon}
					</Box>
					<Typography variant='h6'>{title}</Typography>
				</CardActionArea>
			</Card>
		</Grid>
	);
};
