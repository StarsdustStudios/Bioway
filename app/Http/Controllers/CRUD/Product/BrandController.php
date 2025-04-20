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
        $brand = new Brand();
        $brand->name = $request->name;

        $imagePath = '/storage/brands/placeholder.png';

        if ($request->has('brand_logo') && $request->brand_logo != null) {
            $imagePath = $request->file('brand_logo')->store('brands', 'public');
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

    public function update(BrandRequest $request)
    {
        $brand = Brand::where('id', $request->id)->first();
        $brand->name = $request->name;
        $imagePath = $brand->brand_logo;
        if ($request->has('brand_logo') && $request->brand_logo != null) {
            $imagePath = $request->file('brand_logo')->store('brands', 'public');
        }
        $brand->brand_logo = $imagePath;

        $brand->update();

        return redirect()->back()->with('success', 'Brand created successfully!');
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
