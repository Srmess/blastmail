<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EmailTemplate>
 */
class EmailTemplateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->word(5, true),
            'body' => fake()->randomHtml(),
            'deleted_at' => fake()->boolean() ? fake()->dateTimeBetween('-1 month', 'now') : null,
        ];
    }
}
