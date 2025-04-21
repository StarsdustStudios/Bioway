<?php
namespace App\Http\Controllers\CRUD\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\CarRequest;
use App\Models\Car;
use App\Models\Brand;
use  Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CarController extends Controller
{

    public function index()
    {
        $brands = Brand::with('cars')->get();
        $cars = Car::with('brand')->get();
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
        $imagePath = '/storage/brands/placeholder.png';

        if ($request->has('car_image') && $request->car_image != null) {
            $imagePath = $request->file('car_image')->store('brands', 'public');
            $car->car_image = $imagePath;
        }
        $car->car_image = $imagePath;

        $car->save();
        return redirect()->back()->with('success', 'Car created successfully!');
    }

    public function edit(Car $car)
    {
        $brands = Brand::all();
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

    if ($request->hasFile('car_image') && $request->file('car_image') != null) {
        $imagePath = $request->file('car_image')->store('cars', 'public');
        $car->car_image = $imagePath;
    }

    $car->save();

    return redirect()->back()->with('success', 'Car updated successfully!');
}


    public function destroy(Car $car)
    {
        $path = str_replace('/storage/', '', $car->car_image);
        Storage::disk('public')->delete($path);
        $car->delete();

        $brands = Brand::with('cars')->get();
        $cars = Car::with('brand')->get();
        return Inertia::render('Admin/Dashboard', [
            'message' => 'Car deleted successfully!',
            'brands' => $brands,
            'cars' => $cars,
        ]);
    }
}