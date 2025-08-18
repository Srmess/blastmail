import z from 'zod';

export const ManageSubscriberSchema = z.object({
    name: z.string().min(1, { error: 'Name is required' }),
    email: z.email().min(1, { error: 'Email is required' }),
});

export type ManageSubscriberInfer = z.infer<typeof ManageSubscriberSchema>;
