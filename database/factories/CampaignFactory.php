<?php

namespace Database\Factories;

use App\Models\EmailList;
use App\Models\EmailTemplate;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Validation\Rules\Email;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Campaign>
 */
class CampaignFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(5, true),
            'subject' => fake()->sentence,
            'email_list_id' => EmailList::factory(),
            'email_template_id' => EmailTemplate::factory(),
            'track_click' => fake()->boolean,
            'track_open' => fake()->boolean,
            'body' => fake()->randomHtml(),
            'created_at' => fake()->dateTimeBetween('-1 month', 'now'),
            'updated_at' => fake()->dateTimeBetween('-1 month', 'now'),
            'deleted_at' => fake()->boolean() ? fake()->dateTimeBetween('-1 month', 'now') : null,
        ];
    }
}
