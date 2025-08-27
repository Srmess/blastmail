<?php

use App\Http\Controllers\TrackingController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', 'campaigns');

Route::get('tracking/{mail}/opnening', [TrackingController::class, 'opening'])->name('track.opening');
Route::get('tracking/{mail}/clicks', [TrackingController::class, 'click'])->name('track.click');

require __DIR__ . '/auth.php';
require __DIR__ . '/email-list.php';
require __DIR__ . '/email-template.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/campaigns.php';
require __DIR__ . '/trash.php';
