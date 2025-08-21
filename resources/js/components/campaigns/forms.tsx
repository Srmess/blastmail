import { ManageCampaignInfer } from '@/schemas/campaign';
import { usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import InputError from '../input-error';
import { RichTextEditor } from '../rich-text-editor';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';

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

interface ScheduleProps {
    templateName: string;
    emailsAmount: number;
}

export const ScheduleForm = ({ form, emailsAmount, templateName }: FormProps & ScheduleProps) => {
    const [deliveryDate, setDeliveryDate] = useState<'now' | 'later'>('now');
    const { register, formState, setValue, watch } = form;
    const { mailFromAdress } = usePage<{ mailFromAdress: string }>().props;

    const handleChange = (a: string) => {
        if (a === 'now') {
            setValue('send_at', format(new Date(), 'y-MM-d'));
        }

        setDeliveryDate(a as 'now' | 'later');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="grid h-full gap-2">
                <p className="leading-5">
                    From: <span className="font-semibold">{mailFromAdress}</span>
                </p>
                <div className="flex items-center gap-2">
                    <p className="leading-5">To:</p>
                    <Badge variant={'outline'} className="rounded-full">
                        {emailsAmount} Emails
                    </Badge>
                </div>
                <p className="leading-5">
                    Subject: <span className="font-semibold">{watch('subject')}</span>
                </p>
                <p className="leading-5">
                    Template: <span className="font-semibold">{templateName}</span>
                </p>
            </div>
            <Separator />
            <div className="grid h-full gap-2">
                <p className="font-medium">Schedule Delivery</p>
                <RadioGroup value={deliveryDate} onValueChange={handleChange}>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="now" id="now" onChange={(a) => console.log(a)} />
                        <Label htmlFor="now">Send Now</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="later" id="later" />
                        <Label htmlFor="later">Send Later</Label>
                    </div>
                </RadioGroup>

                {deliveryDate === 'later' && (
                    <div className="grid w-fit gap-2">
                        <Label htmlFor="send_at">Send at</Label>
                        <Input
                            type="date"
                            id="send_at"
                            autoComplete="send_at"
                            placeholder="Type here"
                            min={format(new Date(), 'y-MM-d')}
                            {...register('send_at')}
                        />
                        <InputError message={formState.errors.send_at?.message} />
                    </div>
                )}
            </div>
        </div>
    );
};
