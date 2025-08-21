import { ManageCampaignInfer } from '@/schemas/campaign';
import { UseFormReturn } from 'react-hook-form';
import InputError from '../input-error';
import { RichTextEditor } from '../rich-text-editor';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface FormProps {
    form: UseFormReturn<ManageCampaignInfer>;
}

interface SelectOptions {
    emailListOptions: Array<{ label: string; value: string }>;
    emailTemplateOptions: Array<{ label: string; value: string }>;
}

export const SetupForm = ({ form, emailListOptions, emailTemplateOptions }: FormProps & SelectOptions) => {
    const { register, formState, setValue, watch } = form;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <div className="grid w-full gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" autoFocus autoComplete="name" placeholder="Type here" {...register('name')} />
                    <InputError message={formState.errors.name?.message} />
                </div>
                <div className="grid w-full gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" autoComplete="subject" placeholder="Type here" {...register('subject')} />
                    <InputError message={formState.errors.subject?.message} />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="grid w-full gap-2">
                    <Label htmlFor="email_list_id">Email List</Label>
                    <Select onValueChange={(val) => setValue('email_list_id', val)} defaultValue={watch('email_list_id')}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an email list" />
                        </SelectTrigger>
                        <SelectContent>
                            {emailListOptions.map(({ label, value }) => (
                                <SelectItem value={`${value}`} key={value}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={formState.errors.email_list_id?.message} />
                </div>
                <div className="grid w-full gap-2">
                    <Label htmlFor="email_template_id">Template</Label>
                    <Select onValueChange={(val) => setValue('email_template_id', val)} defaultValue={watch('email_template_id') || ''}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an email list" />
                        </SelectTrigger>
                        <SelectContent>
                            {emailTemplateOptions.map(({ label, value }) => (
                                <SelectItem value={`${value}`} key={value}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={formState.errors.email_template_id?.message} />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <Checkbox id="track_click" className="size-5" onCheckedChange={(val) => setValue('track_click', Boolean(val))} />
                    <Label htmlFor="track_click">Track Click</Label>
                </div>

                <div className="flex items-center gap-3">
                    <Checkbox id="track_open" className="size-5" onCheckedChange={(val) => setValue('track_open', Boolean(val))} />
                    <Label htmlFor="track_open">Track Open</Label>
                </div>
            </div>
        </div>
    );
};

export const BodyForm = ({ form }: FormProps) => {
    const { formState, setValue, getValues } = form;

    return (
        <div className="flex flex-col gap-6">
            <div className="grid h-full gap-2">
                <RichTextEditor setValue={(val) => setValue('body', val)} value={getValues('body')} />
                <InputError message={formState.errors?.body?.message} />
            </div>
        </div>
    );
};

export const ScheduleForm = ({ form }: FormProps) => {
    const { register, formState } = form;

    return (
        <div className="flex flex-col gap-6">
            <div className="grid h-full gap-2">
                <div className="grid w-fit gap-2">
                    <Label htmlFor="send_at">Send at</Label>
                    <Input type="date" id="send_at" autoComplete="send_at" placeholder="Type here" {...register('send_at')} />
                    <InputError message={formState.errors.send_at?.message} />
                </div>
            </div>
        </div>
    );
};
