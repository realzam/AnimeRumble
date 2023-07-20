import Link from 'next/link';

import { FacebookFill, Google, LinkedinOriginal } from 'lineicons-react';

function Social(): JSX.Element {
	return (
		<>
			<span className='mt-6 text-base'>o utiliza tu cuenta</span>
			<div className='mx-0 my-5'>
				<Link
					className='rounded-[50%] inline-flex justify-center border-2 border-neutral-300 w-10 h-10 items-center mx-1 my-0 text-sm no-underline transition-all duration-500 ease-in-out text-neutral-700 dark:text-slate-50 hover:text-slate-50 hover:border-secondary-darken hover:bg-secondary-darken dark:border-slate-200 dark:hover:text-slate-50 dark:hover:bg-secondary-darken dark:hover:border-secondary-darken'
					href='#'
				>
					<FacebookFill fill='currentColor' />
				</Link>
				<Link
					className='rounded-[50%] inline-flex justify-center border-2 border-neutral-300 w-10 h-10 items-center mx-1 my-0 text-sm no-underline transition-all duration-500 ease-in-out text-neutral-700 dark:text-slate-50 hover:text-slate-50 hover:border-secondary-darken hover:bg-secondary-darken dark:border-slate-200 dark:hover:text-slate-50 dark:hover:bg-secondary-darken dark:hover:border-secondary-darken'
					href='#'
				>
					<Google fill='currentColor' />
				</Link>
				<Link
					className='rounded-[50%] inline-flex justify-center border-2 border-neutral-300 w-10 h-10 items-center mx-1 my-0 text-sm no-underline transition-all duration-500 ease-in-out text-neutral-700 dark:text-slate-50 hover:text-slate-50 hover:border-secondary-darken hover:bg-secondary-darken dark:border-slate-200 dark:hover:text-slate-50 dark:hover:bg-secondary-darken dark:hover:border-secondary-darken'
					href='#'
				>
					<LinkedinOriginal fill='currentColor' />
				</Link>
			</div>
		</>
	);
}

export default Social;
