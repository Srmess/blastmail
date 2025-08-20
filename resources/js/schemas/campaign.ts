import z from 'zod';

export const ManageCampaignSchema = z.object({
    name: z.string().min(1, { error: 'Name is required' }),
    subject: z.string().min(1, { error: 'Subject is required' }),
    email_list_id: z.string().min(1, { error: 'Email list is required' }),
    email_template_id: z.string().min(1, { error: 'Email template is required' }),
    track_click: z.boolean().optional(),
    track_open: z.boolean().optional(),
    body: z.string(),
    send_at: z.string().optional(),
});

export type ManageCampaignInfer = z.infer<typeof ManageCampaignSchema>;
