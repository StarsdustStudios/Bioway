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


    public function store(BrandRequest $request)
    {
        // $validated = $request->validated();

        // if ($request->hasFile('brand_logo') && $request->file('brand_logo')->isValid()) {
        //     $file = $request->file('brand_logo');
        //     $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
        //     $path = 'brands/' . $fileName;
        //     Storage::disk('public')->put($path, file_get_contents($file));
        // } else {
        //     return back()->withErrors(['brand_logo' => 'Invalid or missing logo file']);
        // }

        // $brand = new Brand();
        // $brand->name = $validated['name'];
        // $brand->brand_logo ='/storage/brands/' . $fileName;
        // $brand->save();

        $brand = new Brand();
        $brand->name = $request->name;

        $imagePath = '/storage/brands/placeholder.png';

        if ($request->has('image') && $request->image != null) {
            $imagePath = $request->file('image')->store('brands', 'public');
            $brand->brand_logo = $imagePath;
        }

        $brand->brand_logo = $imagePath;

        $brand->save();

        return redirect()->back()->with('success', 'Brand created successfully!');
    }

    public function edit(Brand $brand)
    {
        return Inertia::render('Admin/Dashboard', [
            'brand' => $brand,
        ]);
    }

    // Problemnya disini
    public function update(BrandRequest $request)
    {
        $brand = Brand::where('id', $request->id)->first();
        $brand->name = $request->name;
        $imagePath = $brand->brand_logo;
        if ($request->has('image') && $request->image != null) {
            $imagePath = $request->file('image')->store('brands', 'public');
        }
        $brand->brand_logo = $imagePath;

        $brand->update();

        return redirect()->back()->with('success', 'Brand created successfully!');
        // $validated = $request->validated();
        
        // $brand = Brand::findOrFail($id);
    
        // if ($request->hasFile('brand_logo') && $request->file('brand_logo')->isValid()) {
        //     if ($brand->brand_logo) {
        //         Storage::disk('public')->delete(str_replace('/storage/', '', $brand->brand_logo));
        //     }
    
        //     $file = $request->file('brand_logo');
        //     $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
        //     $path = 'brands/' . $fileName;
    
        //     Storage::disk('public')->put($path, file_get_contents($file));
    
        //     $validated['brand_logo'] = '/storage/' . $path;
        // }
    
        // $brand->update($validated);
    
        // return Inertia::render('Admin/Dashboard', [
        //     'message' => 'Brand updated successfully!',
        //     'brands' => Brand::with('cars')->get()->map(function ($brand) {
        //         $brand->brand_logo = $brand->brand_logo 
        //             ? asset($brand->brand_logo)
        //             : null; // atau bisa kasih placeholder image
        //     }),
        // ]);
    }
    



    // udah fix gini
    public function destroy(Brand $brand)
    {
        $path = str_replace('/storage/', '', $brand->brand_logo);
        Storage::disk('public')->delete($path);
        $brand->delete();

        $brands = Brand::with('cars')->get();
        return Inertia::render('Admin/Dashboard', [
            'message' => 'Brand deleted successfully!',
            'brands' => $brands,
        ]);
    }
}
