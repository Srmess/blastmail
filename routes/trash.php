<?php

use App\Http\Controllers\CampaignController;
use App\Http\Controllers\TrashController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::get('trash', fn() => to_route('trash.campaigns'));
    Route::get('trash/campaigns', [TrashController::class, 'indexCampaigns'])->withTrashed()->name('trash.campaigns');
    Route::put('trash/campaigns/{campaign}', [TrashController::class, 'restoreCampaign'])->withTrashed()->name('trash.campaigns.restore');
    Route::delete('trash/campaigns/{campaign}', [TrashController::class, 'hardDeleteCampaign'])->withTrashed()->name('trash.campaigns.hardDelete');

    Route::get('trash/email-lists', [TrashController::class, 'indexEmailLists'])->withTrashed()->name('trash.email-lists');
    Route::put('trash/email-lists/{EmailList}', [TrashController::class, 'restoreEmailList'])->withTrashed()->name('trash.email-lists.restore');
    Route::delete('trash/email-lists/{EmailList}', [TrashController::class, 'hardDeleteEmailList'])->withTrashed()->name('trash.email-lists.hardDelete');

    Route::get('trash/email-templates', [TrashController::class, 'indexEmailTempaltes'])->withTrashed()->name('trash.email-templates');
    Route::put('trash/email-templates/{EmailTemplate}', [TrashController::class, 'restoreEmailTempalte'])->withTrashed()->name('trash.email-templates.restore');
    Route::delete('trash/email-templates/{EmailTemplate}', [TrashController::class, 'hardDeleteEmailTempalte'])->withTrashed()->name('trash.email-templates.hardDelete');
});
