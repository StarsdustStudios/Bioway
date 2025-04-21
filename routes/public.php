<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Public\HomeController;


//Home Controller route
route::get('/', [HomeController::class, 'index'])->name('Home');


// Route::get('/', function () {
//     return Inertia::render('Main/Home');
// })->name('Home');

Route::prefix('produk')->group(function () { 
    Route::get('/rental', fn() => Inertia::render('Main/Product/Rent'))->name('product.rental');
    Route::get('/carter', fn() => Inertia::render('Main/Product/Carter'))->name('product.carter');
    Route::get('/shuttle-bus', fn() => Inertia::render('Main/Product/ShuttleBus'))->name('product.shuttlebus');
    Route::get('/travel', fn() => Inertia::render('Main/Product/Travel'))->name('product.travel');
    Route::get('/delivery', fn() => Inertia::render('Main/Product/Delivery'))->name('product.delivery');
});

Route::prefix('blog')->group(function () { 
    Route::get('/', fn() => Inertia::render('Main/Blog/Blog'))->name('blog.index');
    // Route::get('/{slug}', fn() => Inertia::render('Blog/Detail'))->name('blog.detail');
});

Route::get('/profil', function () {
    return Inertia::render('Main/About');
})->name('profil');