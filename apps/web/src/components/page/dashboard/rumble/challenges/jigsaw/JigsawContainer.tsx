import JigsawForm from './JigsawForm';
import JigsawListView from './JigsawListView';

const JigsawContainer = () => {
	return (
		<div className='mt-8'>
			<JigsawForm />
			<JigsawListView />
		</div>
	);
};

export default JigsawContainer;
