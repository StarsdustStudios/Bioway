<?php

namespace App\Http\Controllers\CRUD\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\CarterRequest;
use App\Models\Location;
use App\Models\Car;
use App\Models\Carter;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CarterController extends Controller
{
    public function index()
    {
        $cars = Car::with('carters')->get()->map(function ($car) {
            $car->car_image = asset('storage/' . ltrim($car->car_image, '/storage/'));
            return $car;
        });
        
        $locations = Location::with('carters')->get();
        
        $carters = Carter::get();

        return Inertia::render('Admin/Dashboard', [
            'cars' => $cars,
            'carter' => $carters,
            'locations' => $locations,
        ]);
    }

    public function store(CarterRequest $request)
    {
        $carter = new Carter();
        $carter->car_id = $request->car_id;
        $carter->location_id = $request->location_id;
        $carter->price = $request->price;

        $carter->save();

        return redirect()->back()->with('success', 'Car created successfully!');
    }

    public function edit(Car $carter)
    {
        $cars = Car::with('carters')->get()->map(function ($car) {
            $car->car_image = asset('storage/' . ltrim($car->car_image, '/storage/'));
            return $car;
        });
        
        $locations = Location::with('carters')->get();
        
        $carters = Carter::get();

        return Inertia::render('Admin/Dashboard', [
            'cars' => $cars,
            'carter' => $carters,
            'locations' => $locations,
        ]);
    }

    public function update(CarterRequest $request)
    {
        $carter = Carter::find($request->id);

        if (!$carter) {
            return redirect()->back()->withErrors(['Carter not found']);
        }

        $carter->car_id = $request->car_id;
        $carter->location_id = $request->location_id;
        $carter->price = $request->price;

        $carter->save();

        return redirect()->back()->with('success', 'Carter updated successfully!');
    }

    public function destroy(Carter $carter)
    {
        $carter->delete();

        $cars = Car::with('carters')->get()->map(function ($car) {
            $car->car_image = asset('storage/' . ltrim($car->car_image, '/storage/'));
            return $car;
        });
        
        $locations = Location::with('carters')->get();
        
        $carters = Carter::get();

        return Inertia::render('Admin/Dashboard', [
            'message' => 'Carter deleted successfully!',
            'cars' => $cars,
            'carter' => $carters,
            'locations' => $locations,
        ]);
    }
}
