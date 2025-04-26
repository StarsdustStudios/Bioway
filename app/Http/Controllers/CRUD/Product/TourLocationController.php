<?php

namespace App\Http\Controllers\CRUD\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\TourLocationRequest;
use App\Models\TourLocation;
use App\Models\Tour;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TourLocationController extends Controller
{
    public function index()
    {                
        $tour_location = TourLocation::with(["tour_location", "locations"])->get();

        return Inertia::render('Admin/Dashboard', [
            'tour_location' => $tour_location,
        ]);
    }

    public function store(TourLocationRequest $request)
    {
        $tour_location = new Tour();
        $tour_location->tour_id = $request->tour_id;
        $tour_location->location_id = $request->location_id;

        $tour_location->save();

        return redirect()->back()->with('success', 'Tour created successfully!');
    }

    public function update(TourLocationRequest $request)
    {
        $tour_location = Tour::find($request->id);

        if (!$tour_location) {
            return redirect()->back()->withErrors(['Tour not found']);
        }

        $tour_location->tour_id = $request->tour_id;
        $tour_location->location_id = $request->location_id;

        $tour_location->save();

        return redirect()->back()->with('success', 'Tour updated successfully!');
    }

    public function destroy($id)
    {
        $tour_location = Tour::findOrFail($id);
        $tour_location->delete();

        $tour_location = TourLocation::with(["tour_location", "locations"])->get();

        return Inertia::render('Admin/Dashboard', [
            'tour_location' => $tour_location,
        ]);
    }

}
