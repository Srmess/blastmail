<?php

use App\Http\Controllers\TrackingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('tracking/{mail}/opnening', [TrackingController::class, 'opening'])->name('track.opening');

require __DIR__ . '/auth.php';
require __DIR__ . '/email-list.php';
require __DIR__ . '/email-template.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/campaigns.php';
require __DIR__ . '/trash.php';
