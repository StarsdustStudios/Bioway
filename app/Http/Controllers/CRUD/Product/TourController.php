<?php

namespace App\Http\Controllers\CRUD\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\TourRequest;
use App\Models\TourLocation;
use App\Models\Tour;
use App\Models\Location; // <-- Add this
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TourController extends Controller
{
    public function index()
    {
        $tours = Tour::with('locations')->get()->map(function ($tour) {
            $tour->tour_image = asset('storage/' . ltrim($tour->tour_image, '/'));
            return $tour;
        });


        return Inertia::render('Admin/Dashboard', [
            'tours' => $tours,
            'locations' => Location::all(),
        ]);
    }

    public function store(TourRequest $request)
{

    $imagePath = 'tours/placeholder.png';

    if ($request->hasFile('tour_image')) {
        $imagePath = $request->file('tour_image')->store('tours', 'public');
    }
    $tour = new Tour();
    $tour->start = $request->start;
    $tour->title = $request->title; 
    $tour->desc = $request->desc;
    $tour->price = $request->price;
    $tour->passenger = $request->passenger;
    $tour->luggage = $request->luggage; 
    $tour->tour_image = $imagePath;

    $tour->save();

    if ($request->has('pivots') && is_array($request->pivots)) {
        $tour->locations()->attach($request->pivots);
    }

    return redirect()->back()->with('success', 'Tour created successfully!');
}


    public function update(TourRequest $request)
    {
        $tour = Tour::find($request->id);

        if (!$tour) {
            return redirect()->back()->withErrors(['Tour not found']);
        }

        if ($request->hasFile('tour_image')) {
            $imagePath = $request->file('tour_image')->store('tours', 'public');
            $tour->tour_image = $imagePath;
        }

        $tour->update([
            'start' => $request->start,
            'title' => $request->title,
            'desc' => $request->desc,
            'price' => $request->price,
            'passenger' => $request->passenger,
            'luggage' => $request->luggage,
        ]);

        if ($request->has('pivots') && is_array($request->pivots)) {
            $tour->locations()->sync($request->pivots);
        }
        

        return redirect()->back()->with('success', 'Tour updated successfully!');
    }

    public function destroy($id)
    {
        $tour = Tour::findOrFail($id);

        $tour->locations()->detach();
        $tour->delete();

        $tours = Tour::with('locations')->get()->map(function ($tour) {
            $tour->tour_image = asset('storage/' . ltrim($tour->tour_image, '/'));
            return $tour;
        });

        return Inertia::render('Admin/Dashboard', [
            'tours' => $tours,
            'locations' => Location::all(),
        ]);
    }
}
