<?php

namespace App\Http\Controllers\CRUD\CMS;

use App\Http\Controllers\Controller;
use App\Http\Requests\CMS\EventRequest;
use App\Models\Event;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
{
    
    $event = Event::get()->map(function ($event) {
        $event->poster_img = asset('storage/' . $event->poster_img);
        return $event;
    });

    return Inertia::render('Admin/Dashboard', [
        'event' => $event,
    ]);
}



    public function store(EventRequest $request)
    {
        $event = new Event();
        $event->name = $request->name;
        $event->start_at = $request->start_at;
        $event->end_at = $request->end_at;

        $imagePath = '/storage/event/placeholder.png';

        if ($request->has('poster_img') && $request->poster_img != null) {
            $imagePath = $request->file('poster_img')->store('event', 'public');
            $event->poster_img = $imagePath;
        }

        $event->poster_img = $imagePath;

        $event->save();

        return redirect()->back()->with('success', 'Event created successfully!');
    }

    public function edit(Event $event)
{
    $event->poster_img = asset('storage/' . $event->poster_img);

    return Inertia::render('Admin/Dashboard', [
        'event' => $event,
    ]);
}


    public function update(EventRequest $request)
    {
        $event = Event::where('id', $request->id)->first();
        $event->name = $request->name;
        $imagePath = $event->poster_img;
        $event->start_at = $request->start_at;
        $event->end_at = $request->end_at;
        
        if ($request->has('poster_img') && $request->poster_img != null) {
            $imagePath = $request->file('poster_img')->store('event', 'public');
        }
        $event->poster_img = $imagePath;

        $event->update();

        return redirect()->back()->with('success', 'Event created successfully!');
    }
    



    // udah fix gini
    public function destroy(Event $event)
    {
        $path = str_replace('/storage/', '', $event->poster_img);
        Storage::disk('public')->delete($path);
        $event->delete();

        $event = Event::with('cars')->get();
        return Inertia::render('Admin/Dashboard', [
            'message' => 'Event deleted successfully!',
            'event' => $event,
        ]);
    }
}
