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
        ]);
    }

    public function store(TourRequest $request)
    {
        $imagePath = 'tours/placeholder.png';

        if ($request->hasFile('tour_image')) {
            $imagePath = $request->file('tour_image')->store('tours', 'public');
        }

        $tour = Tour::create([
            'start' => $request->start,
            'title' => $request->title,
            'desc' => $request->desc,
            'price' => $request->price,
            'passenger' => $request->passenger,
            'luggage' => $request->luggage,
            'tour_image' => $imagePath,
        ]);

        if ($request->location_id) {
            $tour->locations()->attach($request->location_id);
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

        if ($request->location_id) {
            $tour->locations()->sync($request->location_id);
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

        $locations = Location::all();

        return Inertia::render('Admin/Dashboard', [
            'tours' => $tours,
            'locations' => $locations,
        ]);
    }
}
