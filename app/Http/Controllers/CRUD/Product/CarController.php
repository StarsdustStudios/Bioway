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
        $brands = Brand::all();
        $cars = Car::with('brand')->get();
        return Inertia::render('Admin/Dashboard', [
            'cars' => $cars,
            'brands' => $brands,
        ]);

        // return response()->json([
        //     'cars' => $cars,
        //     'brands' => $brands,
        // ]);
    }
    public function create()
    {
        $brands = Brand::all();
        return Inertia::render('Admin/Dashboard', [
            'brands' => $brands,
        ]);
    }
    public function store(CarRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('car_image') && $request->file('car_image')->isValid()) {
            $file = $request->file('car_image');
            $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
            $path = 'cars/' . $fileName;

            // Simpan file secara manual ke disk 'public'
            Storage::disk('public')->put($path, file_get_contents($file));
        } else {
            return back()->withErrors(['car_image' => 'Invalid or missing logo file']);
        }

        $car = new Car();
        $car->model = $validated['model'];
        $car->brand_id = $validated['brand_id'];
        $car->car_image ='/storage/cars/' . $fileName; // save as brands/xxx.jpg
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
    public function update(CarRequest $request, Car $car)
    {
        return $this->saveBrand($request, $brand);
    }
    public function destroy(Car $car)
    {
        Storage::disk('public')->delete($car->car_image);
        $car->delete();

        $brands = Brand::all();
        $cars = Car::with('brand')->get();
        return Inertia::render('Admin/Dashboard', [
            'message' => 'Car deleted successfully!',
            'brands' => $brands,
            'cars' => $cars,
        ]);
    }
}