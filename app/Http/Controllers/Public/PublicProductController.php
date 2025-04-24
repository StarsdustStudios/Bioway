<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Carter;
use App\Models\Delivery;
use App\Models\Event;
use App\Models\Car;
use App\Models\Rental;
use App\Models\ShuttleBus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PublicProductController extends Controller 
{
    public function getEvents()
    {
        $events = Event::where('start_at', '<=', now())
            ->where('end_at', '>=', now())
            ->get()->map(function ($event) {
                $event->poster_img = asset('storage/' . $event->poster_img);
                return $event;
            });

        if ($events->isEmpty()) {
            $events = Event::orderByDesc('start_at')
                ->limit(3)
                ->get();
        }

        return $events;
    }

    public function rental()
    {
        $events = $this->getEvents();

        $rentals = Rental::with(['car', 'location'])->get()->map(function ($rental) {
            $rental->car->car_image = asset('storage/' . ltrim($rental->car->car_image, '/storage/'));
            
            return $rental;
        });
        // dd($rentals);

        return Inertia::render('Main/Product/Rent', [
            'title' => 'Rental',
            'events' => $events,
            'rentals' => $rentals,
        ]);
        
    }

    public function carter()
    {
        return Inertia::render('Main/Product/Carter', [
            'title' => 'Carter',
        ]);
    }

    public function shuttleBus()
    {
        $events = $this->getEvents();

        $shuttleBuses = ShuttleBus::all();

        return Inertia::render('Main/Product/ShuttleBus', [
            'title' => 'Shuttle Bus',
            'events' => $events,
            'shuttleBuses' => $shuttleBuses,
        ]);
    }

    public function tour()
    {
        $events = $this->getEvents();

        return Inertia::render('Main/Product/Tour', [
            'title' => 'Tour',
            'events' => $events,
        ]);
    }

    public function delivery()
    {
        $events = $this->getEvents();

        // $deliveries = Delivery::all();

        return Inertia::render('Main/Product/Delivery', [
            'title' => 'Delivery',
            'events' => $events,
            // 'deliveries' => $deliveries,
        ]);
    }

    
}