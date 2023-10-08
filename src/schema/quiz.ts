import { z } from 'zod';

import { zodCustomErrorMap } from '@/lib/zodCustomErrorMap';

z.setErrorMap(zodCustomErrorMap);
const CreateQuizSchema = z.object({
	title: z.string().nonempty(),
});

const GetQuizSchema = z.object({
	id: z.string().nonempty(),
});

export { CreateQuizSchema, GetQuizSchema };
