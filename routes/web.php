<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Route::middleware('auth')->group(function () {
    
// });

// Route::get('/Dashboard', [DashboardController::class, 'index'])->name('Dashboard');

// Route::middleware('auth')->group(function () {
    // Route::get('Dashboard', function () {
    //     return Inertia::render('Dashboard');
    // })->name('Dashboard');
// });

// Serve the login page using Inertia
Route::get('/login', function () {
    return Inertia::render('Auth/Login'); // Ensure "Login.tsx" exists in your React frontend
})->name('login');

// Login request handler
Route::post('/login', [AuthController::class, 'login']);
// Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');

// Dashboard route (protected)
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    });
});

require __DIR__.'/settings.php';
// require __DIR__.'/auth.php';
