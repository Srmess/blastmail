<?php

use App\Http\Controllers\CampaignController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::resource('campaigns', CampaignController::class)->except(['show', 'update', 'edit']);

    Route::get('campaigns/{campaign}/{tab}', [CampaignController::class, 'show'])->name('campaigns.dashboard');
});
