<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

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
        
        
        return Inertia::render('Main/Home', [
            'title' => 'Home',
            'description' => $descriptions[array_rand($descriptions)],
        ]);
    }
}