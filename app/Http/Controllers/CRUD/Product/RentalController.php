<?php

namespace App\Http\Controllers\CRUD\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\RentalRequest;
use App\Models\Location;
use App\Models\Car;
use App\Models\Brand;
use App\Models\Rental;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RentalController extends Controller
{
    public function index()
    {
        $cars = Car::with('rentals')->get()->map(function ($car) {
            $car->car_image = asset('storage/' . ltrim($car->car_image, '/storage/'));
            return $car;
        });
        
        $locations = Location::with('rentals')->get();
        
        $rentals = Rental::get();

        return Inertia::render('Admin/Dashboard', [
            'cars' => $cars,
            'rental' => $rentals,
            'locations' => $locations,
        ]);
    }

    public function store(RentalRequest $request)
    {
        $rental = new Rental();
        $rental->car_id = $request->car_id;
        $rental->location_id = $request->location_id;
        $rental->price = $request->price;
        $rental->driver_fee = $request->driver_fee;

        $rental->save();

        return redirect()->back()->with('success', 'Car created successfully!');
    }

    public function edit(Car $rental)
    {
        $cars = Car::with('rentals')->get()->map(function ($car) {
            $car->car_image = asset('storage/' . ltrim($car->car_image, '/storage/'));
            return $car;
        });
        
        $locations = Location::with('rentals')->get();
        
        $rentals = Rental::get();

        return Inertia::render('Admin/Dashboard', [
            'cars' => $cars,
            'rental' => $rentals,
            'locations' => $locations,
        ]);
    }

    public function update(RentalRequest $request)
    {
        $rental = Rental::find($request->id);

        if (!$rental) {
            return redirect()->back()->withErrors(['Rental not found']);
        }

        $rental->car_id = $request->car_id;
        $rental->location_id = $request->location_id;
        $rental->price = $request->price;
        $rental->driver_fee = $request->driver_fee;

        $rental->save();

        return redirect()->back()->with('success', 'Car updated successfully!');
    }

    public function destroy(Rental $rental)
    {
        $rental->delete();

        $cars = Car::with('rentals')->get()->map(function ($car) {
            $car->car_image = asset('storage/' . ltrim($car->car_image, '/storage/'));
            return $car;
        });
        
        $locations = Location::with('rentals')->get();
        
        $rentals = Rental::get();

        return Inertia::render('Admin/Dashboard', [
            'message' => 'Car deleted successfully!',
            'cars' => $cars,
            'rental' => $rentals,
            'locations' => $locations,
        ]);
    }
}
