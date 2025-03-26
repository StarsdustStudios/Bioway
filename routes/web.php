<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthController;

Route::get('/', function () {
    return Inertia::render('Admin/Dashboard');
})->name('dashboard');


// Route::middleware(['auth'])->prefix('product')->group(function () {
// Tuker bawah ini sama yang pake auth diatas kalau udah
Route::prefix('product')->group(function () { 
    Route::get('/rental', fn() => Inertia::render('Admin/Dashboard'))->name('product.rental');
    Route::get('/carter', fn() => Inertia::render('Admin/Dashboard'))->name('product.carter');
    Route::get('/shuttle-bus', fn() => Inertia::render('Admin/Dashboard'))->name('product.shuttlebus');
    Route::get('/travel', fn() => Inertia::render('Admin/Dashboard'))->name('product.travel');
    Route::get('/delivery', fn() => Inertia::render('Admin/Dashboard'))->name('product.delivery');
});


// Route::middleware(['auth'])->prefix('cms')->group(function () {
// Tuker bawah ini sama yang pake auth diatas kalau udah
Route::prefix('cms')->group(function () { 
    Route::get('/tags', fn() => Inertia::render('Dashboard'))->name('product.tags');
    Route::get('/promo', fn() => Inertia::render('Dashboard'))->name('product.promo');
    Route::get('/post', fn() => Inertia::render('Dashboard'))->name('product.post');
});

// require __DIR__.'/settings.php';
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
