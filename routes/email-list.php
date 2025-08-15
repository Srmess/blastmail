<?php

use App\Http\Controllers\EmailListController;
use App\Http\Controllers\SubscriberController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('email-list', [EmailListController::class, 'index'])->name('email-list.index');
    Route::get('email-list/create', [EmailListController::class, 'create'])->name('email-list.create');
    Route::post('email-list/store', [EmailListController::class, 'store'])->name('email-list.store');

    Route::get('email-list/{emailList}/subscribers', [SubscriberController::class, 'index'])->name('subscribers.index');
    Route::get('email-list/{emailListId}/subscribers/create', [SubscriberController::class, 'create'])->name('subscribers.create');
    Route::post('email-list/{emailListId}/subscribers/create', [SubscriberController::class, 'store'])->name('subscribers.create');
});

require __DIR__ . '/auth.php';
