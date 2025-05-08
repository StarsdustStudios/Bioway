<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\PublicProductController;
use App\Http\Controllers\Public\PublicBlogController;


//Home Controller route
route::get('/', [HomeController::class, 'index'])->name('Home');


// Route::get('/', function () {
//     return Inertia::render('Main/Home');
// })->name('Home');

//Product Controller route
Route::prefix('produk')->group(function () { 
    Route::get('/rental', [PublicProductController::class, 'rental'])->name('product.rental');
    Route::get('/carter', [PublicProductController::class, 'carter'])->name('product.carter');
    Route::get('/shuttle-bus', [PublicProductController::class, 'shuttleBus'])->name('product.shuttlebus');
    Route::get('/tour', [PublicProductController::class, 'tour'])->name('product.travel');
    Route::get('/delivery', [PublicProductController::class, 'delivery'])->name('product.delivery');
});

Route::prefix('blog')->group(function () { 
    Route::get('/', [PublicBlogController::class, 'index'])->name('blog.index');
    Route::get('/{slug}', [PublicBlogController::class, 'show'])->name('blog.show');
});

Route::get('/profil', function () {
    return Inertia::render('Main/About');
})->name('profil');