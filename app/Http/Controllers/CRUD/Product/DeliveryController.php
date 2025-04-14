<?php
//Delivery CRUD
namespace App\Http\Controllers\CRUD\Product;

use App\Http\Controllers\Controller;
use App\Models\Delivery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

//Class
class DeliveryController extends Controller
{
    public function index()
    {
        $deliveries = Delivery::with('car')->get();
        return Inertia::render('Admin/Dashboard', [
            'deliveries' => $deliveries,
        ]);
    }
    // public function create()
    // {

    // }
    public function store(Request $request)
    {
        $validated = $request->validated();

        $deliveries = new Delivery();
        $deliveries->location_id = $validated['location_id'];
        $deliveries->size = $validated['size'];
        $deliveries->price = $validated['price'];
        $deliveries->save();

        $deliveries = Delivery::with('car')->get();
        return Inertia::render('Admin/Dashboard', [
            'message' => 'Delivery created successfully!',
            'deliveries' => $deliveries,
        ]);
    }
    // public function edit(Delivery $delivery)
    // {

    // }
    public function update(Request $request, Delivery $delivery)
    {
        return $this->saveDelivery($request, $delivery);
    }
    public function destroy(Delivery $delivery)
    {
        $delivery->delete();

        $deliveries = Delivery::with('car')->get();
        return Inertia::render('Admin/Dashboard', [
            'message' => 'Delivery deleted successfully!',
            'deliveries' => $deliveries,
        ]);
    }
    // private function saveDelivery($request, Delivery $delivery = null)
    // {

    // }
}