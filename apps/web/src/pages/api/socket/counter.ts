import { type NextApiRequest } from 'next';

import { type NextApiResponseServerIo } from '@/types/socket';

export default async function handeler(
	req: NextApiRequest,
	res: NextApiResponseServerIo,
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}
	try {
		if (!res.socket.server.io) {
			console.log('noexiste socker server en api');
		} else {
			res.socket.server.io.emit('couterUpdated', 4);
		}
		return res.status(200).json({ ok: true });
	} catch (error) {
		console.error('Error in API /socket/counter');
		console.error(error);
		return res.status(500).json({ error: 'Internal Error' });
	}
}
