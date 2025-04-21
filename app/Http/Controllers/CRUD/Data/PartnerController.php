<?php

namespace App\Http\Controllers\CRUD\Data;

use App\Http\Controllers\Controller;
use App\Http\Requests\Data\PartnerRequest;
use App\Models\Partner;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PartnerController extends Controller
{
    public function index()
    {
        $partner = Partner::get();

        return Inertia::render('Admin/Dashboard', [
            'partner' => $partner,
        ]);
    }


    public function store(PartnerRequest $request)
    {
        $partner = new Partner();
        $partner->name = $request->name;

        $imagePath = '/storage/partner/placeholder.png';

        if ($request->has('logo') && $request->logo != null) {
            $imagePath = $request->file('logo')->store('partners', 'public');
            $partner->logo = $imagePath;
        }

        $partner->logo = $imagePath;

        $partner->save();

        return redirect()->back()->with('success', 'Partner created successfully!');
    }

    public function edit(Partner $partner)
    {
        return Inertia::render('Admin/Dashboard', [
            'partner' => $partner,
        ]);
    }

    public function update(PartnerRequest $request)
    {
        $partner = Partner::where('id', $request->id)->first();
        $partner->name = $request->name;
        $imagePath = $partner->logo;
        if ($request->has('logo') && $request->logo != null) {
            $imagePath = $request->file('logo')->store('partners', 'public');
        }
        $partner->logo = $imagePath;

        $partner->update();

        return redirect()->back()->with('success', 'Partner created successfully!');
    }
    



    // udah fix gini
    public function destroy(Partner $partner)
    {
        $path = str_replace('/storage/', '', $partner->logo);
        Storage::disk('public')->delete($path);
        $partner->delete();

        $partners = Partner::get();
        return Inertia::render('Admin/Dashboard', [
            'message' => 'Partner deleted successfully!',
            'partners' => $partners,
        ]);
    }
}
