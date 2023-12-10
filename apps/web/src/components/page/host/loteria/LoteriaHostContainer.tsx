import { Button } from '@ui/Button';

const LoteriaHostContainer = () => {
	return (
		<div className='mx-auto mt-8 flex w-52 flex-col items-center space-y-5'>
			<div className='text-lg font-semibold capitalize'>counter: 0</div>
			<div className='flex w-full justify-between'>
				<Button onClick={() => {}}>+1</Button>
				<Button onClick={() => {}}>reset</Button>
				<Button onClick={() => {}}>-1</Button>
			</div>
		</div>
	);
};

export default LoteriaHostContainer;
