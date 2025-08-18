<?php

use App\Http\Controllers\EmailTemplateController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::resource('email-template', EmailTemplateController::class);
});
