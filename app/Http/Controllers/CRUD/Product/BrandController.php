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
        $brands = Brand::with('cars')->get()->map(function ($brand) {
            $brand->brand_logo = asset('storage/' . ltrim($brand->brand_logo, '/storage/'));
            return $brand;
        });

        return Inertia::render('Admin/Dashboard', [
            'brands' => $brands,
        ]);
    }

    public function store(BrandRequest $request)
    {
        $brand = new Brand();
        $brand->name = $request->name;

        $imagePath = 'brands/placeholder.png';

        if ($request->hasFile('brand_logo')) {
            $imagePath = $request->file('brand_logo')->store('brands', 'public');
        }

        $brand->brand_logo = $imagePath;
        $brand->save();

        return redirect()->back()->with('success', 'Brand created successfully!');
    }

    public function edit(Brand $brand)
    {
        $brand->brand_logo = asset('storage/' . ltrim($brand->brand_logo, '/storage/'));

        return Inertia::render('Admin/Dashboard', [
            'brand' => $brand,
        ]);
    }

    public function update(BrandRequest $request)
    {
        $brand = Brand::findOrFail($request->id);
        $brand->name = $request->name;

        if ($request->hasFile('brand_logo')) {
            $brand->brand_logo = $request->file('brand_logo')->store('brands', 'public');
        }

        $brand->save();

        return redirect()->back()->with('success', 'Brand updated successfully!');
    }

    public function destroy(Brand $brand)
    {
        $path = str_replace('/storage/', '', $brand->brand_logo);
        Storage::disk('public')->delete($path);
        $brand->delete();

        $brands = Brand::with('cars')->get()->map(function ($brand) {
            $brand->brand_logo = asset('storage/' . ltrim($brand->brand_logo, '/storage/'));
            return $brand;
        });

        return Inertia::render('Admin/Dashboard', [
            'message' => 'Brand deleted successfully!',
            'brands' => $brands,
        ]);
    }
}