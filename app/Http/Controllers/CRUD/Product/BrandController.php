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
    }

    public function create()
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function store(BrandRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('brand_logo') && $request->file('brand_logo')->isValid()) {
            $file = $request->file('brand_logo');
            $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
            $path = 'brands/' . $fileName;
            Storage::disk('public')->put($path, file_get_contents($file));
        } else {
            return back()->withErrors(['brand_logo' => 'Invalid or missing logo file']);
        }

        $brand = new Brand();
        $brand->name = $validated['name'];
        $brand->brand_logo ='/storage/brands/' . $fileName;
        $brand->save();

        return redirect()->back()->with('success', 'Brand created successfully!');
    }

    public function update(BrandRequest $request, Brand $brand)
    {
        $validated = $request->validated();
    
        if ($request->hasFile('brand_logo') && $request->file('brand_logo')->isValid()) {
            // Delete the old logo from the storage
            Storage::disk('public')->delete($brand->brand_logo);
    
            // Upload the new logo
            $file = $request->file('brand_logo');
            $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
            $path = 'storage/brands/' . $fileName;
    
            // Save the new logo path
            // You might want to update it to the appropriate path or variable
            $validated['brand_logo'] = '/storage/brands/' . $path;
    
            // You can now move the file to storage (if you uncomment the line below)
            // Storage::disk('public')->put($path, file_get_contents($file));
        }
    
        // Update the Brand record with validated data, including the new logo path
        $brand->update($validated);
    
        return redirect()->back()->with('success', 'Brand updated successfully!');
    }
    

public function edit(Brand $brand)
{
    return Inertia::render('Admin/Dashboard', [
        'brand' => $brand,
    ]);
}


    public function destroy(Brand $brand)
    {
        Storage::disk('public')->delete($brand->brand_logo);
        $brand->delete();

        
        $brands = Brand::with('cars')->get();

        return Inertia::render('Admin/Dashboard', [
            'message' => 'Brand deleted successfully!',
            'brands' => $brands,
        ]);
    }
}
