import GalleryForm from './GalleryForm';
import GalleryListView from './GalleryListView';

const GalleryContainer = () => {
	return (
		<div className='mt-8'>
			<GalleryForm />
			<GalleryListView />
		</div>
	);
};

export default GalleryContainer;
