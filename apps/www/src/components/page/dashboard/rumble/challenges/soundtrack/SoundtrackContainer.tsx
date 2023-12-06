import SoundtrackForm from './SoundtrackForm';
import SoundtrackPlayerContainer from './SoundtrackPlayerContainer';

const SoundtrackContainer = () => {
	return (
		<div className='mt-8 space-y-8'>
			<SoundtrackForm />
			<SoundtrackPlayerContainer />
		</div>
	);
};

export default SoundtrackContainer;
