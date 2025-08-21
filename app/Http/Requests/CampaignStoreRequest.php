<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CampaignStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'max:255'],
            'subject' => ['required', 'max:40'],
            'email_list_id' => ['nullable', 'exists:email_lists,id'],
            'email_template_id' => ['nullable', 'exists:email_templates,id'],
            'track_click' => ['nullable'],
            'track_open' => ['nullable'],
            'body' => ['required'],
            'send_at' => ['required', 'date'],
        ];
    }
}
