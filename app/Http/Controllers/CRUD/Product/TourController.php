<?php

namespace App\Http\Controllers\CRUD\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\TourRequest;
use App\Models\Location;
use App\Models\Tour;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TourController extends Controller
{
    public function index()
    {                
        $tour = Tour::get();
        $locations = Location::get();

        return Inertia::render('Admin/Dashboard', [
            'tour' => $tour,
            'locations' => $locations,
        ]);
    }

    public function store(TourRequest $request)
    {
        $tour = new Tour();
        $tour->start = $request->start;
        $tour->desc = $request->desc;
        $tour->price = $request->price;

        $tour->save();

        return redirect()->back()->with('success', 'Car created successfully!');
    }

    public function update(TourRequest $request)
    {
        $tour = Tour::find($request->id);

        if (!$tour) {
            return redirect()->back()->withErrors(['Tour not found']);
        }

        $tour->start = $request->start;
        $tour->desc = $request->desc;
        $tour->price = $request->price;

        $tour->save();

        return redirect()->back()->with('success', 'Tour updated successfully!');
    }

    public function destroy($id)
    {
        $tour = Tour::findOrFail($id);
        $tour->delete();

        $tour = Tour::get();
        $locations = Location::get();

        return Inertia::render('Admin/Dashboard', [
            'tour' => $tour,
            'locations' => $locations,
        ]);
    }

}
