import z from 'zod';

export const ManageEmailTemplateSchema = z.object({
    title: z.string(),
    body: z.string(),
});

export type ManageEmailTemplateInfer = z.infer<typeof ManageEmailTemplateSchema>;
