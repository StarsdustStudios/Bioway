<?php

namespace App\Http\Controllers\CRUD\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\CarRequest;
use App\Models\Car;
use App\Models\Brand;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CarController extends Controller
{
    public function index()
    {
        $brands = Brand::with('cars')->get()->map(function ($brand) {
            $brand->brand_logo = asset('storage/' . ltrim($brand->brand_logo, '/storage/'));
            return $brand;
        });

        $cars = Car::with('brand')->get()->map(function ($car) {
            $car->car_image = asset('storage/' . ltrim($car->car_image, '/storage/'));
            return $car;
        });

        return Inertia::render('Admin/Dashboard', [
            'cars' => $cars,
            'brands' => $brands,
        ]);
    }

    public function store(CarRequest $request)
    {
        $car = new Car();
        $car->model = $request->model;
        $car->brand_id = $request->brand_id;
        $car->seat = $request->seat;
        $car->luggage = $request->luggage;

        $imagePath = 'cars/placeholder.png';

        if ($request->hasFile('car_image')) {
            $imagePath = $request->file('car_image')->store('cars', 'public');
        }

        $car->car_image = $imagePath;
        $car->save();

        return redirect()->back()->with('success', 'Car created successfully!');
    }

    public function edit(Car $car)
    {
        $brands = Brand::all()->map(function ($brand) {
            $brand->brand_logo = asset('storage/' . ltrim($brand->brand_logo, '/storage/'));
            return $brand;
        });

        $car->car_image = asset('storage/' . ltrim($car->car_image, '/storage/'));

        return Inertia::render('Admin/Dashboard', [
            'cars' => $car,
            'brands' => $brands,
        ]);
    }

    public function update(CarRequest $request)
    {
        $car = Car::find($request->id);

        if (!$car) {
            return redirect()->back()->withErrors(['Car not found']);
        }

        $car->model = $request->model;
        $car->brand_id = $request->brand_id;
        $car->seat = $request->seat;
        $car->luggage = $request->luggage;

        if ($request->hasFile('car_image')) {
            $car->car_image = $request->file('car_image')->store('cars', 'public');
        }

        $car->save();

        return redirect()->back()->with('success', 'Car updated successfully!');
    }

    public function destroy(Car $car)
    {
        $path = str_replace('/storage/', '', $car->car_image);
        Storage::disk('public')->delete($path);
        $car->delete();

        $brands = Brand::with('cars')->get()->map(function ($brand) {
            $brand->brand_logo = asset('storage/' . ltrim($brand->brand_logo, '/storage/'));
            return $brand;
        });

        $cars = Car::with('brand')->get()->map(function ($car) {
            $car->car_image = asset('storage/' . ltrim($car->car_image, '/storage/'));
            return $car;
        });

        return Inertia::render('Admin/Dashboard', [
            'message' => 'Car deleted successfully!',
            'brands' => $brands,
            'cars' => $cars,
        ]);
    }
}
