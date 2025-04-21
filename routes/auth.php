<?php
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\CRUD\Product\BrandController;
use App\Http\Controllers\CRUD\Product\CarController;
use App\Http\Controllers\CRUD\Data\PartnerController;
use App\Http\Controllers\CRUD\CMS\EventController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Protected routes (authenticated users)
Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');


    //Frontend
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    });

    Route::prefix('product')->group(function () { 
        Route::get('/rental', fn() => Inertia::render('Admin/Dashboard'))->name('product.rental');
        Route::get('/carter', fn() => Inertia::render('Admin/Dashboard'))->name('product.carter');
        Route::get('/shuttle-bus', fn() => Inertia::render('Admin/Dashboard'))->name('product.shuttlebus');
        Route::get('/travel', fn() => Inertia::render('Admin/Dashboard'))->name('product.travel');
        Route::get('/delivery', fn() => Inertia::render('Admin/Dashboard'))->name('product.delivery');

        Route::resource('cars', CarController::class)->names([
            'index' => 'product.cars',
            'create' => 'product.cars.create',
            'store' => 'product.cars.store',
            'show' => 'product.cars.show',
            'update' => 'product.cars.update',
            'destroy' => 'product.cars.destroy',
        ]);
        // ->except(['show']);
        Route::resource('brands', BrandController::class)->names([
            'index' => 'product.brands',
            'create' => 'product.brands.create',
            'store' => 'product.brands.store',
            'show' => 'product.brands.show',
            'update' => 'product.brands.update',
            'destroy' => 'product.brands.destroy',
        ]);
        // ->except(['show']);
        Route::resource('partners', PartnerController::class)->names([
            'index' => 'product.partners',
            'create' => 'product.partners.create',
            'store' => 'product.partners.store',
            'show' => 'product.partners.show',
            'update' => 'product.partners.update',
            'destroy' => 'product.partners.destroy',
        ]);

    });
    
    Route::prefix('cms')->group(function () { 
        Route::get('/tags', fn() => Inertia::render('Admin/Dashboard'))->name('product.tags');
        Route::resource('events', EventController::class)->names([
            'index' => 'product.events',
            'create' => 'product.events.create',
            'store' => 'product.events.store',
            'show' => 'product.events.show',
            'update' => 'product.events.update',
            'destroy' => 'product.events.destroy',
        ]);
        Route::get('/post', fn() => Inertia::render('Admin/Dashboard'))->name('product.post');
    });

    //Backend

});
