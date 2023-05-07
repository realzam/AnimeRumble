import {
	createContext,
	memo,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import { Paper, Stack, Typography } from '@mui/material';
import useSWR from 'swr';

import { IQuiz } from '@/interfaces';
export interface IUser {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: Type;
	site_admin: boolean;
}

export type Type = 'User' | 'Organization';

const GlobalStateContext = createContext({
	users: [],
	mutateUsers: () => {
		console.log('mutateUsers');
	},
	error: null,
	count: 0,
});

export function GlobalStateProvider({
	children,
}: {
	children: JSX.Element | JSX.Element[];
}) {
	const fetcher = (url: string) => fetch(url).then(res => res.json());
	const {
		data: users,
		error,
		mutate: mutateUsers,
	} = useSWR(`https://api.github.com/users`, fetcher);
	const [count, setCount] = useState(0);
	const interval = useRef<NodeJS.Timer>();

	useEffect(() => {
		interval.current = setInterval(() => {
			// mutateQuiz();
			setCount(count => count + 1);
		}, 3000);

		return () => {
			interval.current && clearInterval(interval.current);
		};
	}, []);

	const value = useMemo(
		() => ({ users, error, mutateUsers, count }),
		[users, error, mutateUsers, count],
	);

	return (
		<GlobalStateContext.Provider value={{ ...value }}>
			{children}
		</GlobalStateContext.Provider>
	);
}

export function useGlobalState() {
	const context = useContext(GlobalStateContext);

	if (!context) {
		throw new Error('You need to wrap GlobalStateProvider.');
	}

	return context;
}

export function UserWrapper() {
	const { users, error } = useGlobalState();
	return (
		<Paper>
			<Users users={users} error={error} />
		</Paper>
	);
}

const Users = memo(function Users({
	users,
	error,
}: {
	users: IUser[];
	error: null;
}) {
	if (!users && !error) {
		return <div>Loading...</div>;
	}
	console.log('users', users[0].login);

	return (
		<ul>
			{users.map(u => (
				<li key={u.id}>{u.login}</li>
			))}
		</ul>
	);
});

const QInfo = memo(function Quiz({
	quiz,
	error,
}: {
	quiz: IQuiz;
	error: null;
}) {
	if (!quiz && !error) {
		return <div>Loading...</div>;
	}
	console.log('quiz', quiz);

	return (
		<>
			<Stack direction='row'>
				<Typography>{quiz.title}</Typography>
			</Stack>

			<ul>
				{quiz.questions.map((q, i) => (
					<li key={`${q.question}-${i}`}>{q.question}</li>
				))}
			</ul>
		</>
	);
});

export function Counter() {
	const { count } = useGlobalState();

	return <div>Count: {count}</div>;
}
