<?php

use App\Http\Controllers\EmailListController;
use App\Http\Controllers\SubscriberController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('email-list', [EmailListController::class, 'index'])->name('email-list.index');
    Route::get('email-list/create', [EmailListController::class, 'create'])->name('email-list.create');
    Route::post('email-list/store', [EmailListController::class, 'store'])->name('email-list.store');

    Route::get('email-list/{emailList}/subscribers', [SubscriberController::class, 'index'])->name('subscribers.index');
    Route::get('email-list/{emailList}/subscribers/create', [SubscriberController::class, 'create'])->name('subscribers.create');
    Route::post('email-list/{emailList}/subscribers/create', [SubscriberController::class, 'store']);
    Route::delete('email-list/{emailListId}/subscriber/{subscriber}/delete', [SubscriberController::class, 'destroy'])->name('subscribers.destroy');
});

require __DIR__ . '/auth.php';
