<?php

namespace Database\Seeders;

use App\Models\Campaign;
use App\Models\EmailList;
use App\Models\EmailTemplate;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CampaignSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $emailList = EmailList::query()->inRandomOrder()->first();
        $emailTemplate = EmailTemplate::query()->inRandomOrder()->first();

        Campaign::factory()->count(rand(10, 25))->create([
            'email_list_id' => $emailList->id,
            'email_template_id' => $emailTemplate->id,
        ]);
    }
}
