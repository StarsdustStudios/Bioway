<?php
//Rental CRUD
namespace App\Http\Controllers\CRUD\Product;

use App\Http\Controllers\Controller;
use App\Models\Rental;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

//Class
class RentalController extends Controller
{
    public function index()
    {
        $rentals = Rental::with('car')->get();
        return Inertia::render('Admin/Dashboard', [
            'rentals' => $rentals,
        ]);
    }
    public function create()
    {
        $cars = Car::all();
        return Inertia::render('Admin/Dashboard', [
            'cars' => $cars,
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validated();

        $rentals = new Rental();
        $rentals->car_id = $validated['car_id'];
        $rentals->location_id = $validated['location_id'];
        $rentals->price = $validated['price'];
        $rentals->driver_fee = $validated['driver_fee'];
        $rentals->save();

        $rentals = Rental::with('car')->get();
        return Inertia::render('Admin/Dashboard', [
            'message' => 'Rental created successfully!',
            'rentals' => $rentals,
        ]);

    }
    public function edit(Rental $Rental)
    {

    }
    public function update(Request $request, Rental $Rental)
    {

    }
    public function destroy(Rental $Rental)
    {

    }
    private function saveRental($request, Rental $Rental = null)
    {

    }
}