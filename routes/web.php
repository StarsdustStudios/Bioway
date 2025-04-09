<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthController;


// Serve the login page using Inertia
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

// Login request handler
Route::post('/login', [AuthController::class, 'login']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
