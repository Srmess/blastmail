import { ManageCampaignInfer } from '@/schemas/campaign';
import { UseFormReturn } from 'react-hook-form';
import InputError from '../input-error';
import { RichTextEditor } from '../rich-text-editor';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface FormProps {
    form: UseFormReturn<ManageCampaignInfer>;
}

const bodyOptions = [1, 2, 3, 4, 5];

export const SetupForm = ({ form }: FormProps) => {
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
                            {bodyOptions.map((option) => {
                                return (
                                    <SelectItem value={`${option}`} key={option}>
                                        {option}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                    <InputError message={formState.errors.email_list_id?.message} />
                </div>
                <div className="grid w-full gap-2">
                    <Label htmlFor="email_template_id">Template</Label>
                    <Select onValueChange={(val) => setValue('email_template_id', val)} defaultValue={watch('email_template_id')}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an email list" />
                        </SelectTrigger>
                        <SelectContent>
                            {bodyOptions.map((option) => {
                                return (
                                    <SelectItem value={`${option}`} key={option}>
                                        {option}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                    <InputError message={formState.errors.email_template_id?.message} />
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
                    <Label htmlFor="subject">Subject</Label>
                    <Input type="date" id="subject" autoComplete="subject" placeholder="Type here" {...register('subject')} />
                    <InputError message={formState.errors.subject?.message} />
                </div>
            </div>
        </div>
    );
};
