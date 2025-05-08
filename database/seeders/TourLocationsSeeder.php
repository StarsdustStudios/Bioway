<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class TourLocationsSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 0; $i < 70; $i++) {
            DB::table('tour_locations')->insert([
                'tour_id' => rand(1, 50),
                'location_id' => rand(1, 10),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
