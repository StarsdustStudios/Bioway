<?php

namespace App\Http\Controllers\CRUD\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\DeliveryRequest;
use App\Models\Location;
use App\Models\Car;
use App\Models\Delivery;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DeliveryController extends Controller
{
    public function index()
    {   
        $locations = Location::with('deliveries')->get();
        
        $delivery = Delivery::get();

        return Inertia::render('Admin/Dashboard', [
            'delivery' => $delivery,
            'locations' => $locations,
        ]);
    }

    public function store(DeliveryRequest $request)
    {
        $delivery = new Delivery();
        $delivery->location_id = $request->location_id;
        $delivery->price = $request->price;
        $delivery->size = $request->size;
        $delivery->save();

        return redirect()->back()->with('success', 'Car created successfully!');
    }

    public function edit(Car $delivery)
    {        
        $locations = Location::with('delivery')->get();
        
        $delivery = Delivery::get();

        return Inertia::render('Admin/Dashboard', [
            
            'delivery' => $delivery,
            'locations' => $locations,
        ]);
    }

    public function update(DeliveryRequest $request)
    {
        $delivery = Delivery::find($request->id);

        if (!$delivery) {
            return redirect()->back()->withErrors(['Delivery not found']);
        }

        $delivery->location_id = $request->location_id;
        $delivery->price = $request->price;
        $delivery->size = $request->size;

        $delivery->save();

        return redirect()->back()->with('success', 'Delivery updated successfully!');
    }

    public function destroy(Delivery $delivery)
    {
        $delivery->delete();
        
        $locations = Location::with('deliveries')->get();
        
        $delivery = Delivery::get();

        return Inertia::render('Admin/Dashboard', [
            'message' => 'Delivery deleted successfully!',
            
            'delivery' => $delivery,
            'locations' => $locations,
        ]);
    }
}
