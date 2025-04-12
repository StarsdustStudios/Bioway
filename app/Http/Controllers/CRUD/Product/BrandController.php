<?php

namespace App\Http\Controllers\CRUD\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\BrandRequest;
use App\Models\Brand;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::with('cars')->get();

        return Inertia::render('Admin/Dashboard', [
            'brands' => $brands,
        ]);
    //      return response()->json([
    //     'brands' => $brands,
    // ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function store(BrandRequest $request)
{
    $validated = $request->validated();

    if ($request->hasFile('brand_logo') && $request->file('brand_logo')->isValid()) {
        // Store to storage/app/public/brands and make it accessible via /storage
        $path = $request->file('brand_logo')->store('brands', 'public');
    } else {
        return back()->withErrors(['brand_logo' => 'Invalid file upload']);
    }

    $brand = new Brand();
    $brand->name = $validated['name'];
    $brand->brand_logo = $path; // Example: "brands/logo.png"
    $brand->save();

    $brands = Brand::with('cars')->get();

    return Inertia::render('Admin/Dashboard', [
        'message' => 'Brand created successfully!',
        'brands' => $brands,
    ]);
}


    public function edit(Brand $brand)
    {
        return Inertia::render('Admin/Dashboard', [
            'brand' => $brand,
        ]);
    }

    public function update(BrandRequest $request, Brand $brand)
    {
        return $this->saveBrand($request, $brand);
    }

    public function destroy(Brand $brand)
    {
        if ($brand->brand_logo) {
            // If brand_logo is a URL, no need to delete from storage
            // If it's an actual file path, you'd delete it as follows:
            // Storage::disk('public')->delete($brand->brand_logo);
        }

        $brand->delete();

        
        $brands = Brand::with('cars')->get();

        return Inertia::render('Admin/Dashboard', [
            'message' => 'Brand deleted successfully!',
            'brands' => $brands,
        ]);
    }

    /**
     * Shared method to create or update a brand.
     */
    private function saveBrand(BrandRequest $request, Brand $brand = null)
    {
        $data = $request->validated();

        // Since brand_logo is a string URL now, no need to handle file uploads
        // The frontend is passing the brand_logo as a string (URL)
        if ($brand) {
            $brand->update($data);
            $message = 'Brand updated successfully!';
        } else {
            Brand::create($data);
            $message = 'Brand created successfully!';
        }

        return redirect()->route('brands.index')->with('success', $message);
    }
}
