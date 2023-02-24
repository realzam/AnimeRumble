import { MainLayout } from '@/layouts';
import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const create = (): JSX.Element => {
	return (
		<MainLayout>
			<Grid container spacing={2}>
				<Grid xs={8}>
					<Card>
						<CardContent>
							<Typography
								sx={{ fontSize: 14 }}
								color='text.secondary'
								gutterBottom
							>
								Word of the Day
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid xs={4}>
					<div>xs=4</div>
				</Grid>
				<Grid xs={4}>
					<div>xs=4</div>
				</Grid>
				<Grid xs={8}>
					<div>xs=8</div>
				</Grid>
			</Grid>
		</MainLayout>
	);
};

export default create;
