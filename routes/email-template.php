<?php

use App\Http\Controllers\EmailTemplateController;
use App\Models\EmailTemplate;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::resource('email-template', EmailTemplateController::class);
    Route::get('email-template/{email_template}/json', [EmailTemplateController::class, 'get'])->name('email-template.get');
});
