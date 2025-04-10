<?php
namespace App\Http\Controllers\CRUD\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\CarBrandRequest;
use App\Models\Car;
use App\Models\Brand;
use  Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::with('cars')->get();
        return Inertia::render('CRUD/Product/Brand/Index', [
            'brands' => $brands,
        ]);
    }
    public function create()
    {
        return Inertia::render('CRUD/Product/Brand/Create');
    }
    public function store(CarBrandRequest $request)
    {
        $validated = $request->validated();
        $validated['brand_logo'] = $request->file('brand_logo')->store('brands', 'public');
        Brand::create($validated);
        return redirect()->route('brands.index')->with('success', 'Brand created successfully!');
    }
    public function edit(Brand $brand)
    {
        return Inertia::render('CRUD/Product/Brand/Edit', [
            'brand' => $brand,
        ]);
    }

    public function update(CarBrandRequest $request, Brand $brand)
    {
        $validated = $request->validated();
        if ($request->hasFile('brand_logo')) {
            Storage::disk('public')->delete($brand->brand_logo);
            $validated['brand_logo'] = $request->file('brand_logo')->store('brands', 'public');
        }
        $brand->update($validated);
        return redirect()->route('brands.index')->with('success', 'Brand updated successfully!');
    }
    public function destroy(Brand $brand)
    {
        Storage::disk('public')->delete($brand->brand_logo);
        $brand->delete();
        return redirect()->route('brands.index')->with('success', 'Brand deleted successfully!');
    }

    private function saveBrand($request, Brand $brand = null)
    {
        $data = $request->validated();

        if ($request->hasFile('brand_logo')) {
            if ($brand && $brand->brand_logo) {
                Storage::disk('public')->delete($brand->brand_logo);
            }

            $data['brand_logo'] = $request->file('brand_logo')->store('brand_logos', 'public');
        }

        if ($brand) {
            $brand->update($data);
            $message = 'Brand updated successfully!';
        } else {
            Brand::create($data);
            $message = 'Brand created successfully!';
        }

        return redirect()->route('brands.index')->with('success', $message);
    }
}

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::with('brand')->get();
        return Inertia::render('CRUD/Product/Car/Index', [
            'cars' => $cars,
        ]);
    }
    public function create()
    {
        $brands = Brand::all();
        return Inertia::render('CRUD/Product/Car/Create', [
            'brands' => $brands,
        ]);
    }
    public function store(CarBrandRequest $request)
    {
        $validated = $request->validated();
        $validated['car_image'] = $request->file('car_image')->store('cars', 'public');
        Car::create($validated);
        return redirect()->route('cars.index')->with('success', 'Car created successfully!');
    }
    public function edit(Car $car)
    {
        $brands = Brand::all();
        return Inertia::render('CRUD/Product/Car/Edit', [
            'car' => $car,
            'brands' => $brands,
        ]);
    }
    public function update(CarBrandRequest $request, Car $car)
    {
        $validated = $request->validated();
        if ($request->hasFile('car_image')) {
            Storage::disk('public')->delete($car->car_image);
            $validated['car_image'] = $request->file('car_image')->store('cars', 'public');
        }
        $car->update($validated);
        return redirect()->route('cars.index')->with('success', 'Car updated successfully!');
    }
    public function destroy(Car $car)
    {
        Storage::disk('public')->delete($car->car_image);
        $car->delete();
        return redirect()->route('cars.index')->with('success', 'Car deleted successfully!');
    }
    private function saveCar($request, Car $car = null)
    {
        $data = $request->validated();

        if ($request->hasFile('car_image')) {
            if ($car && $car->car_image) {
                Storage::disk('public')->delete($car->car_image);
            }

            $data['car_image'] = $request->file('car_image')->store('car_images', 'public');
        }

        if ($car) {
            $car->update($data);
            $message = 'Car updated successfully!';
        } else {
            Car::create($data);
            $message = 'Car created successfully!';
        }

        return redirect()->route('cars.index')->with('success', $message);
    }
}