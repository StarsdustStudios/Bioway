<?php

namespace App\Http\Controllers\CRUD\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ShuttleBusRequest;
use App\Models\Location;
use App\Models\Car;
use App\Models\ShuttleBus;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ShuttleBusController extends Controller
{
    public function index()
    {
        $cars = Car::with('shuttleBuses')->get()->map(function ($car) {
            $car->car_image = asset('storage/' . ltrim($car->car_image, '/storage/'));
            return $car;
        });
        
        $locations = Location::with(['departures', 'arrivals'])->get();
        
        $shuttle_bus = ShuttleBus::get();

        return Inertia::render('Admin/Dashboard', [
            'cars' => $cars,
            'shuttle_bus' => $shuttle_bus,
            'locations' => $locations,
        ]);
    }

    public function store(ShuttleBusRequest $request)
    {
        $shuttle_bus = new ShuttleBus();
        $shuttle_bus->car_id = $request->car_id;
        $shuttle_bus->from = $request->from;
        $shuttle_bus->to = $request->to;
        $shuttle_bus->price = $request->price;

        $shuttle_bus->save();

        return redirect()->back()->with('success', 'Car created successfully!');
    }

    public function edit(Car $shuttle_bus)
    {
        $cars = Car::with('shuttleBuses')->get()->map(function ($car) {
            $car->car_image = asset('storage/' . ltrim($car->car_image, '/storage/'));
            return $car;
        });
        
        $locations = Location::with(['departures', 'arrivals'])->get();
        
        $shuttle_bus = ShuttleBus::get();

        return Inertia::render('Admin/Dashboard', [
            'cars' => $cars,
            'shuttle_bus' => $shuttle_bus,
            'locations' => $locations,
        ]);
    }

    public function update(ShuttleBusRequest $request)
    {
        $shuttle_bus = ShuttleBus::find($request->id);

        if (!$shuttle_bus) {
            return redirect()->back()->withErrors(['ShuttleBus not found']);
        }

        $shuttle_bus->car_id = $request->car_id;
        $shuttle_bus->from = $request->from;
        $shuttle_bus->to = $request->to;
        $shuttle_bus->price = $request->price;

        $shuttle_bus->save();

        return redirect()->back()->with('success', 'ShuttleBus updated successfully!');
    }

    public function destroy($id)
{
    $shuttle_bus = ShuttleBus::findOrFail($id);
    $shuttle_bus->delete();

    $cars = Car::with('shuttleBuses')->get()->map(function ($car) {
        $car->car_image = asset('storage/' . ltrim($car->car_image, '/storage/'));
        return $car;
    });

    $locations = Location::with(['departures', 'arrivals'])->get();
    $shuttle_bus = ShuttleBus::get();

    return Inertia::render('Admin/Dashboard', [
        'message' => 'ShuttleBus deleted successfully!',
        'cars' => $cars,
        'shuttle_bus' => $shuttle_bus,
        'locations' => $locations,
    ]);
}

}
