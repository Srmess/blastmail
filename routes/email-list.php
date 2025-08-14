<?php

use App\Http\Controllers\EmailListController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('email-list', [EmailListController::class, 'index'])->name('email-list.index');
    Route::get('email-list/create', [EmailListController::class, 'create'])->name('email-list.create');
    Route::post('email-list/store', [EmailListController::class, 'store'])->name('email-list.store');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
