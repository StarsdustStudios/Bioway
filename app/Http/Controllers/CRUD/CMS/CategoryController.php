<?php

namespace App\Http\Controllers\CRUD\CMS;

use App\Http\Controllers\Controller;
use App\Http\Requests\CMS\CategoryRequest;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $category = Category::get();
        return Inertia::render('Admin/Dashboard', [
            'category' => $category,
        ]);
    }


    public function store(CategoryRequest $request)
    {
        $category = new Category();
        $category->name = $request->name;

        $category->save();

        return redirect()->back()->with('success', 'Category created successfully!');
    }

    public function edit(Category $category)
    {
        return Inertia::render('Admin/Dashboard', [
            'category' => $category,
        ]);
    }

    public function update(CategoryRequest $request)
    {
        $category = Category::where('id', $request->id)->first();
        $category->name = $request->name;
        $category->update();

        return redirect()->back()->with('success', 'Category created successfully!');
    }
    
    public function destroy(Category $category)
    {
        $category->delete();
        $categorys = Category::get();
        return Inertia::render('Admin/Dashboard', [
            'message' => 'Category deleted successfully!',
            'categorys' => $categorys,
        ]);
    }
}
