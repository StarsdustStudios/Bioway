<?php
//shuttle Bus CRUD
namespace App\Http\Controllers\CRUD\Product;

use App\Http\Controllers\Controller;
use App\Models\ShuttleBus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

//Class
class ShuttleBusController extends Controller
{
    public function index()
    {
        $shuttleBuses = ShuttleBus::with('car')->get();
        return Inertia::render('Admin/Dashboard', [
            'shuttleBuses' => $shuttleBuses,
        ]);
    }
    // public function create()
    // {

    // }
    public function store(Request $request)
    {
        $validated = $request->validated();

        $shuttleBuses = new ShuttleBus();
        $shuttleBuses->car_id = $validated['car_id'];
        $shuttleBuses->location_id = $validated['location_id'];
        $shuttleBuses->price = $validated['price'];
        $shuttleBuses->driver_fee = $validated['driver_fee'];
        $shuttleBuses->save();

        $shuttleBuses = ShuttleBus::with('car')->get();
        return Inertia::render('Admin/Dashboard', [
            'message' => 'Shuttle Bus created successfully!',
            'shuttleBuses' => $shuttleBuses,
        ]);
    }
    
    // public function edit(ShuttleBus $ShuttleBus)
    // {

    // }
    public function update(Request $request, ShuttleBus $ShuttleBus)
    {
        return $this->saveBus($request, $ShuttleBus);
    }
    public function destroy(ShuttleBus $ShuttleBus)
    {
        $ShuttleBus->delete();

        $shuttleBuses = ShuttleBus::with('car')->get();
        return Inertia::render('Admin/Dashboard', [
            'message' => 'Shuttle Bus deleted successfully!',
            'shuttleBuses' => $shuttleBuses,
        ]);
    }
    // private function saveBus($request, ShuttleBus $ShuttleBus = null)
    // {

    // }
}