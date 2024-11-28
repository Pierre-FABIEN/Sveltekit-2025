import { z } from 'zod';

// Zod schema for the Chat model
export const chatSchema = z.object({
	message: z
		.string()
		.min(1, { message: 'Message cannot be empty' })
		.max(500, { message: 'Message cannot exceed 500 characters' })
});

export type chatForm = z.infer<typeof chatSchema>;
