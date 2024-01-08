import React from 'react';

const WrongAnswersNotification = () => {
	return (
		<div className='absolute left-0 z-50 flex h-20 w-full animate-fade-down flex-col items-center justify-center rounded-b bg-red-400 text-lg font-semibold tracking-widest text-white animate-normal animate-once'>
			{/* <Memo>
									{() => (
										<>{time.get() <= 0 ? 'Se acabo el tiempo' : 'Incorrecto'}</>
									)}
								</Memo> */}
			<div className='rounded-full bg-white px-4 py-1 text-lg text-red-400'>
				No te rindas, tu puedes
			</div>
		</div>
	);
};

export default WrongAnswersNotification;
