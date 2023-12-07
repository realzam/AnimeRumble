import ResultsCard from './ResultsCard';
import SummaryQuestionsList from './SummaryQuestionsList';

const PlayQuizStadistics = () => {
	return (
		<div className='container mt-9 flex flex-col space-y-4'>
			<ResultsCard accuracy={10} />
			<SummaryQuestionsList />
		</div>
	);
};

export default PlayQuizStadistics;
