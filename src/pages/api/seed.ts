import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/db';
import { QuizModel } from '@/db/models';

interface Data {
	message: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	if (process.env.NODE_ENV === 'production') {
		return res.status(401).json({ message: 'Acceso no permitido' });
	}
	await db.connect();
	await QuizModel.deleteMany();
	await db.disconnect();
	res.status(200).json({ message: 'Proceso realizado correctamente' });
}
