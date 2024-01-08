import PlayQuizStadistics from './PlayQuizStadistics';
import ResultsCard from './ResultsCard';

// import SummaryQuestionsList from './SummaryQuestionsList';

const PlayQuizStadisticsUser = () => {
	return (
		<div className='container mt-9 flex flex-col space-y-4'>
			<ResultsCard />
			<PlayQuizStadistics />
		</div>
	);
};

export default PlayQuizStadisticsUser;
