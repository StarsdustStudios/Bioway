<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Carter;
use App\Models\Delivery;
use App\Models\Event;
use App\Models\Car;
use App\Models\Rental;
use App\Models\ShuttleBus;
use App\Models\Location;
use App\Models\Tour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;


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
        $events = Event::get()->map(function ($event) {
            if (!Str::startsWith($event->poster_img, 'http')) {
                $event->poster_img = asset('storage/' . Str::replaceFirst('storage/', '', $event->poster_img));
            }
            return $event;
        });
    
        $rentals = Rental::with(['car', 'location', 'car.brand'])->get()->map(function ($rental) {
            $carImage = $rental->car->car_image;
            if (!Str::startsWith($carImage, 'http')) {
                $carImage = asset('storage/' . Str::replaceFirst('storage/', '', $carImage));
            }
    
            $rental->car->car_image = $carImage;
            return $rental;
        });
    
        return Inertia::render('Main/Product/Rent', [
            'title' => 'Rental',
            'events' => $events,
            'rentals' => $rentals,
        ]);
    }

    public function carter()
{
    $events = Event::get()->map(function ($event) {
        $event->poster_img = asset('storage/' . $event->poster_img);
        return $event;
    });

    $carters = Carter::with(['car', 'location'])->get()->map(function ($carter) {
        if ($carter->car && $carter->car->car_image && !Str::startsWith($carter->car->car_image, ['http://', 'https://'])) {
            $carter->car->car_image = asset('storage/' . ltrim($carter->car->car_image, '/'));
        }
        return $carter;
    });

    return Inertia::render('Main/Product/Carter', [
        'title' => 'Carter',
        'events' => $events,
        'carters' => $carters,
    ]);
}

public function shuttleBus()
{
    $events = Event::get()->map(function ($event) {
        $event->poster_img = asset('storage/' . $event->poster_img);
        return $event;
    });

    $shuttleBuses = ShuttleBus::with(['car'])->get()->map(function ($shuttleBus) {
        // Ensure car image is correctly formatted
        if ($shuttleBus->car && $shuttleBus->car->car_image && !Str::startsWith($shuttleBus->car->car_image, ['http://', 'https://'])) {
            $shuttleBus->car->car_image = asset('storage/' . ltrim($shuttleBus->car->car_image, '/'));
        }

        // Load locations based on 'from' and 'to' IDs
        $shuttleBus->from_location = Location::find($shuttleBus->from);
        $shuttleBus->to_location = Location::find($shuttleBus->to);

        // Optional: You can also format the location data if you prefer
        if ($shuttleBus->from_location) {
            $shuttleBus->from_location_name = $shuttleBus->from_location->city_name;
        }
        if ($shuttleBus->to_location) {
            $shuttleBus->to_location_name = $shuttleBus->to_location->city_name;
        }

        return $shuttleBus;
    });

    return Inertia::render('Main/Product/ShuttleBus', [
        'title' => 'Shuttle Bus',
        'events' => $events,
        'shuttleBuses' => $shuttleBuses,
    ]);
}


    public function tour()
    {
        $events = Event::get()->map(function ($event) {
        $event->poster_img = asset('storage/' . $event->poster_img);
        return $event;
    });
        $tours = Tour::with('locations')->get()->map(function ($tour) {
            $tour->tour_image = asset('storage/' . ltrim($tour->tour_image, '/'));
            return $tour;
        });

        return Inertia::render('Main/Product/Tour', [
            'title' => 'Tour',
            'events' => $events,
            'tours' => $tours,
            'locations' => Location::all(),
        ]);
    }

    public function delivery()
    {
        $events = Event::get()->map(function ($event) {
        $event->poster_img = asset('storage/' . $event->poster_img);
        return $event;
    });

        $deliveries = Delivery::with('location')->get()->map(function ($delivery) {
            if ($delivery->location && $delivery->location->city_name) {
                $delivery->location_name = $delivery->location->city_name;
            }
            return $delivery;
        });
        return Inertia::render('Main/Product/Delivery', [
            'title' => 'Delivery',
            'events' => $events,
            'deliveries' => $deliveries,
        ]);

    //         return response()->json([
    //             'title' => 'Delivery',
    //             'events' => $events,
    //             'deliveries' => $deliveries,
    // ]);
    }

    
}