<?php
//Carter CRUD
namespace App\Http\Controllers\CRUD\Product;

use App\Http\Controllers\Controller;
use App\Models\Carter; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


//Class
class CarterController extends Controller
{
    public function index()
    {
        $carters = Carter::with('car')->get();
        return Inertia::render('Admin/Dashboard', [
            'carters' => $carters,
        ]);
    }
    // public function create()
    // {

    // }
    public function store(Request $request)
    {
        $validated = $request->validated();

        $carters = new Carter();
        $carters->car_id = $validated['car_id'];
        $carters->location_id = $validated['location_id'];
        $carters->price = $validated['price'];
        $carters->save();

        $carters = Carter::with('car')->get();
        return Inertia::render('Admin/Dashboard', [
            'message' => 'Carter created successfully!',
            'carters' => $carters,
        ]);
    }
    // public function edit(Carter $carter)
    // {

    // }
    public function update(Request $request, Carter $carter)
    {
        return $this->saveCarter($request, $carter);
    }
    public function destroy(Carter $carter)
    {
        $carter->delete();

        $carters = Carter::with('car')->get();
        return Inertia::render('Admin/Dashboard', [
            'message' => 'Carter deleted successfully!',
            'carters' => $carters,
        ]);
    }
    private function saveCarter($request, Carter $carter = null)
    {

    }
}