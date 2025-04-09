<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('Home');

Route::prefix('produk')->group(function () { 
    Route::get('/rental', fn() => Inertia::render('Product/Rental'))->name('product.rental');
    Route::get('/carter', fn() => Inertia::render('Product/Carter'))->name('product.carter');
    Route::get('/shuttle-bus', fn() => Inertia::render('Product/ShuttleBus'))->name('product.shuttlebus');
    Route::get('/travel', fn() => Inertia::render('Product/Travel'))->name('product.travel');
    Route::get('/delivery', fn() => Inertia::render('Product/Delivery'))->name('product.delivery');
});

Route::prefix('blog')->group(function () { 
    Route::get('/', fn() => Inertia::render('Blog/Index'))->name('blog.index');
    Route::get('/{slug}', fn() => Inertia::render('Blog/Detail'))->name('blog.detail');
});

Route::get('/profil', function () {
    return Inertia::render('About');
})->name('profil');