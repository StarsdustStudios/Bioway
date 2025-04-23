<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Partner;
use App\Models\Event;

class HomeController extends Controller
{
    public function index()
    {
        //array of descriptions and titles array
        $descriptions = [
            'Welcome to our car rental service!',
            'Explore the world with our car rental service!',
            'Experience the freedom of the open road with our car rental service!',
            'Discover new destinations with our car rental service!',
            'Rent a car and make your travel dreams come true!',
        ];

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

        // dd($events);

        $partners = Partner::all()->map(function ($partner) {
            $partner->logo = asset('storage/' . $partner->logo);
            return $partner;
        });

        // dd($partners);


        return Inertia::render('Main/Home', [
            'title' => 'Home',
            'description' => $descriptions[array_rand($descriptions)],
            'partners' => $partners,
            'events' => $events,
        ]);
    }
}