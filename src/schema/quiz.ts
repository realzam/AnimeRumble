import { z } from 'zod';

import { zodCustomErrorMap } from '@/lib/zodCustomErrorMap';

z.setErrorMap(zodCustomErrorMap);
const CreteQuizSchema = z.object({
	title: z.string().nonempty(),
});

export { CreteQuizSchema };
