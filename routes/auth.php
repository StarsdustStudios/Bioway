<?php
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RegisterController;

use App\Http\Controllers\CRUD\Product\BrandController;
use App\Http\Controllers\CRUD\Product\CarController;
use App\Http\Controllers\CRUD\Product\RentalController;
use App\Http\Controllers\CRUD\Product\CarterController;
use App\Http\Controllers\CRUD\Product\ShuttleBusController;
use App\Http\Controllers\CRUD\Product\TourController;
use App\Http\Controllers\CRUD\Product\DeliveryController;

use App\Http\Controllers\CRUD\Data\PartnerController;
use App\Http\Controllers\CRUD\Data\LocationController;

use App\Http\Controllers\CRUD\CMS\EventController;
use App\Http\Controllers\CRUD\CMS\CategoryController;
use App\Http\Controllers\CRUD\CMS\PostController;

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
        Route::resource('rental', RentalController::class)->names([
            'index' => 'product.rental',
            'create' => 'product.rental.create',
            'store' => 'product.rental.store',
            'show' => 'product.rental.show',
            'update' => 'product.rental.update',
            'destroy' => 'product.rental.destroy',
        ]);        
        
        Route::resource('carter', CarterController::class)->names([
            'index' => 'product.carter',
            'create' => 'product.carter.create',
            'store' => 'product.carter.store',
            'show' => 'product.carter.show',
            'update' => 'product.carter.update',
            'destroy' => 'product.carter.destroy',
        ]);

        Route::resource('shuttle-bus', ShuttleBusController::class)->names([
            'index' => 'product.shuttle-bus',
            'create' => 'product.shuttle-bus.create',
            'store' => 'product.shuttle-bus.store',
            'show' => 'product.shuttle-bus.show',
            'update' => 'product.shuttle-bus.update',
            'destroy' => 'product.shuttleBus.destroy',
        ]);

        Route::resource('tour', TourController::class)->names([
            'index' => 'product.tour',
            'create' => 'product.tour.create',
            'store' => 'product.tour.store',
            'show' => 'product.tour.show',
            'update' => 'product.tour.update',
            'destroy' => 'product.tour.destroy',
        ]);    
            
        Route::resource('delivery', DeliveryController::class)->names([
            'index' => 'product.delivery',
            'create' => 'product.delivery.create',
            'store' => 'product.delivery.store',
            'show' => 'product.delivery.show',
            'update' => 'product.delivery.update',
            'destroy' => 'product.delivery.destroy',
        ]);  

        Route::resource('cars', CarController::class)->names([
            'index' => 'product.cars',
            'create' => 'product.cars.create',
            'store' => 'product.cars.store',
            'show' => 'product.cars.show',
            'update' => 'product.cars.update',
            'destroy' => 'product.cars.destroy',
        ]);
        
        Route::resource('brands', BrandController::class)->names([
            'index' => 'product.brands',
            'create' => 'product.brands.create',
            'store' => 'product.brands.store',
            'show' => 'product.brands.show',
            'update' => 'product.brands.update',
            'destroy' => 'product.brands.destroy',
        ]);
        
        Route::resource('partners', PartnerController::class)->names([
            'index' => 'product.partners',
            'create' => 'product.partners.create',
            'store' => 'product.partners.store',
            'show' => 'product.partners.show',
            'update' => 'product.partners.update',
            'destroy' => 'product.partners.destroy',
        ]);

        Route::resource('locations', LocationController::class)->names([
            'index' => 'product.locations',
            'create' => 'product.locations.create',
            'store' => 'product.locations.store',
            'show' => 'product.locations.show',
            'update' => 'product.locations.update',
            'destroy' => 'product.locations.destroy',
        ]);

    });
    
    Route::prefix('cms')->group(function () { 
        Route::get('/tags', fn() => Inertia::render('Admin/Dashboard'))->name('product.tags');
        
        Route::resource('tags', EventController::class)->names([
            'index' => 'cms.tags',
            'create' => 'cms.tags.create',
            'store' => 'cms.tags.store',
            'show' => 'cms.tags.show',
            'update' => 'cms.tags.update',
            'destroy' => 'cms.tags.destroy',
        ]);

        Route::resource('events', EventController::class)->names([
            'index' => 'cms.events',
            'create' => 'cms.events.create',
            'store' => 'cms.events.store',
            'show' => 'cms.events.show',
            'update' => 'cms.events.update',
            'destroy' => 'cms.events.destroy',
        ]);

        Route::resource('categories', CategoryController::class)->names([
            'index' => 'cms.categories',
            'create' => 'cms.categories.create',
            'store' => 'cms.categories.store',
            'show' => 'cms.categories.show',
            'update' => 'cms.categories.update',
            'destroy' => 'cms.categories.destroy',
        ]);

        Route::resource('posts', PostController::class)->names([
            'index' => 'cms.posts',
            'create' => 'cms.posts.create',
            'store' => 'cms.posts.store',
            'show' => 'cms.posts.show',
            'update' => 'cms.posts.update',
            'destroy' => 'cms.posts.destroy',
        ]);
    });

    //Backend

});
