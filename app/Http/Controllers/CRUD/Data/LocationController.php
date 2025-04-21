<?php

namespace App\Http\Controllers\CRUD\Data;

use App\Http\Controllers\Controller;
use App\Http\Requests\Data\LocationRequest;
use App\Models\Location;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LocationController extends Controller
{
    public function index()
    {
        $location = Location::get();
        return Inertia::render('Admin/Dashboard', [
            'location' => $location,
        ]);
    }


    public function store(LocationRequest $request)
    {
        $location = new Location();
        $location->city_name = $request->city_name;

        $location->save();

        return redirect()->back()->with('success', 'Location created successfully!');
    }

    public function edit(Location $location)
    {
        return Inertia::render('Admin/Dashboard', [
            'location' => $location,
        ]);
    }

    public function update(LocationRequest $request)
    {
        $location = Location::where('id', $request->id)->first();
        $location->city_name = $request->city_name;
        $location->update();

        return redirect()->back()->with('success', 'Location created successfully!');
    }
    
    public function destroy(Location $location)
    {
        $location->delete();
        $locations = Location::get();
        return Inertia::render('Admin/Dashboard', [
            'message' => 'Location deleted successfully!',
            'locations' => $locations,
        ]);
    }
}
