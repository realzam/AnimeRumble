import { z } from 'zod';

import { zodCustomErrorMap } from '@/lib/zodCustomErrorMap';

z.setErrorMap(zodCustomErrorMap);

export const UserUpdateSchema = z.object({
	nickName: z.string().min(1).optional(),
});

export const NickNameForm = z.object({
	nickName: z.string().min(1),
});
