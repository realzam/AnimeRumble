import SoundtrackForm from './SoundtrackForm';
import SoundTrackListView from './SoundTrackListView';

const SoundtrackContainer = () => {
	return (
		<div className='mt-8 space-y-8'>
			<SoundtrackForm />
			<SoundTrackListView />
		</div>
	);
};

export default SoundtrackContainer;
