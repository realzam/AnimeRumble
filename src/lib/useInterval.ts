import { useEffect, useRef } from 'react';

export function useInterval(callback, ms: number) {
	const savedCallback = useRef();

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		const cb = savedCallback.current;
		if (cb && ms !== undefined && ms !== null) {
			const interval = setInterval(cb, ms);

			return () => clearInterval(interval);
		}
		return undefined;
	}, [ms]);
}
