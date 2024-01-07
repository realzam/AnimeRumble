import React from 'react';

import Sidebar from './Sidebar';

interface Props {
	active?: 'quizzes' | 'bingo' | 'loteria' | 'members' | 'rumble';
	children: React.ReactNode;
}

const DashBoardAdmin = ({ children, active }: Props) => {
	return (
		<div className='grid lg:grid-cols-5'>
			<div className='col-span-1 h-[calc(100vh-3.5rem-1px)] bg-card'>
				<Sidebar active={active} />
			</div>
			<div className='col-span-3 lg:col-span-4 lg:border-l'>{children}</div>
		</div>
	);
};

export default DashBoardAdmin;
