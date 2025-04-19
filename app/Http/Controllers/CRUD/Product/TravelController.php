<?php
// Travel CRUD
namespace App\Http\Controllers\CRUD\Product;

use App\Http\Controllers\Controller;
use App\Models\Travel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

//Class
class TravelController extends Controller
{
    public function index()
    {
        $travels = Travel::with('car')->get();
        return Inertia::render('Admin/Dashboard', [
            'travels' => $travels,
        ]);
    }
    // public function create()
    // {

    // }

    public function store(Request $request)
    {
        $validated = $request->validated();

        $travels = new Travel();
        $travels->location_1 = $validated['location_1'];
        $travels->location_2 = $validated['location_2'];
        $travels->price = $validated['price'];
    }
    // public function edit(Travel $travel)
    // {

    // }
    public function update(Request $request, Travel $travel)
    {
        return $this->saveTravel($request, $travel);
    }
    public function destroy(Travel $travel)
    {
        $travel->delete();

        $travels = Travel::with('car')->get();
        return Inertia::render('Admin/Dashboard', [
            'message' => 'Travel deleted successfully!',
            'travels' => $travels,
        ]);
    }
    // private function saveTravel($request, Travel $travel = null)
    // {

    // }
}