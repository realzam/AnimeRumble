import { z } from 'zod';

import { zodCustomErrorMap } from '@/lib/zodCustomErrorMap';

z.setErrorMap(zodCustomErrorMap);

const AddBingoReactiveSchema = z.object({
	description: z.string().min(1).trim(),
	response: z.string().min(1).trim(),
});

export { AddBingoReactiveSchema };
