import z from 'zod';

export const ManageEmailListSchema = z.object({
    title: z.string().min(1, { error: 'Title is required' }),
    subscribersFile: z
        .any()
        .refine((files) => files instanceof FileList && files.length > 0, {
            message: 'File is required',
        })
        .refine((files) => files instanceof FileList && Array.from(files).every((file) => file.type === 'text/csv'), {
            message: 'Only CSV files are allowed',
        })
        .refine((files) => files instanceof FileList && Array.from(files).every((file) => file.size <= 5 * 1024 * 1024), {
            message: 'File must be smaller than 5MB',
        }),

    // any().refine((files) => files?.length > 0, 'File is required'),
});

export type ManageEmailListInfer = z.infer<typeof ManageEmailListSchema>;
