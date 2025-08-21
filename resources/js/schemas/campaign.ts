import z from 'zod';

export const ManageCampaignSchema = z.object({
    name: z.string().min(1, { error: 'Name is required' }).max(255, { error: 'Name must be at most 255 characters' }),
    subject: z.string().min(1, { error: 'Subject is required' }).max(40, { error: 'Subject must be at most 40 characters' }),
    email_list_id: z.string().min(1, { error: 'Email list is required' }),
    email_template_id: z.string().nullable().optional(),
    track_click: z.boolean().optional(),
    track_open: z.boolean().optional(),
    body: z.string().min(1, { error: 'body is required' }),
    send_at: z.string().min(1, { error: 'schedule date is required' }),
});

export type ManageCampaignInfer = z.infer<typeof ManageCampaignSchema>;
