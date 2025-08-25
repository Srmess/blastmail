<?php

use App\Http\Controllers\CampaignController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::resource('campaigns', CampaignController::class)->except(['show', 'update', 'edit']);

    Route::get('campaigns/{campaign}', [CampaignController::class, 'show'])->name('campaign.dash');
});
