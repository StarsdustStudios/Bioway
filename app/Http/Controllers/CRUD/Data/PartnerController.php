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
        $partners = Partner::all()->map(function ($partner) {
            $partner->logo = asset('storage/' . $partner->logo);
            return $partner;
        });

        return Inertia::render('Admin/Dashboard', [
            'partners' => $partners,
        ]);
    }

    public function store(PartnerRequest $request)
    {
        $partner = new Partner();
        $partner->name = $request->name;

        if ($request->hasFile('logo')) {
            $partner->logo = $request->file('logo')->store('partners', 'public');
        } else {
            $partner->logo = 'partner/placeholder.png';
        }

        $partner->save();

        return redirect()->back()->with('success', 'Partner created successfully!');
    }

    public function edit(Partner $partner)
    {
        $partner->logo = asset('storage/' . $partner->logo);

        return Inertia::render('Admin/Dashboard', [
            'partner' => $partner,
        ]);
    }

    public function update(PartnerRequest $request)
    {
        $partner = Partner::findOrFail($request->id);
        $partner->name = $request->name;

        if ($request->hasFile('logo')) {
            $partner->logo = $request->file('logo')->store('partners', 'public');
        }

        $partner->save();

        return redirect()->back()->with('success', 'Partner updated successfully!');
    }

    public function destroy(Partner $partner)
    {
        $path = str_replace('/storage/', '', $partner->logo);
        Storage::disk('public')->delete($path);
        $partner->delete();

        $partners = Partner::all()->map(function ($partner) {
            $partner->logo = asset('storage/' . $partner->logo);
            return $partner;
        });

        return Inertia::render('Admin/Dashboard', [
            'message' => 'Partner deleted successfully!',
            'partners' => $partners,
        ]);
    }
}
