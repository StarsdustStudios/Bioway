<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TourLocationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TourLocation::factory()->count(70)->create([
            'tour_id' => rand(1, 50),
            'location_id' => rand(1, 10),
        ]);
    }
}
