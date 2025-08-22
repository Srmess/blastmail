<?php

use App\Http\Controllers\CampaignController;
use App\Mail\EmailCampaign;
use App\Models\Campaign;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::resource('campaigns', CampaignController::class);

    Route::get('campaigns/{campaign}/emails', function (Campaign $campaign) {
        Mail::to('boynerd@outlook.com')->send(new EmailCampaign($campaign));
    });
});
