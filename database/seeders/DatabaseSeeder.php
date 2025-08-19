<?php

namespace Database\Seeders;

use App\Models\EmailList;
use App\Models\Subscriber;
use App\Models\User;
use GuzzleHttp\Promise\Create;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            EmailTemplateSeeder::class,
            EmailListSeeder::class,
            CampaignSeeder::class
        ]);
    }
}
