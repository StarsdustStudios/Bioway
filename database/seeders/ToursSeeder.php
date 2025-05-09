<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tour;
use Faker\Factory as Faker;
use App\Models\Location;
use DB;

class ToursSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
 $faker = Faker::create();

        // Make sure you have at least some locations seeded
        $locations = Location::all();

        foreach (range(1, 5) as $i) {
            // Generate a 16:9 image (1280x720)
            $image = $faker->image(
                storage_path('app/public/tours'), // Save path
                1280,
                720,
                null,
                false // Return filename only
            );

            // Create tour record
            $tour = Tour::create([
                'start' => rand(1, 10), // Change based on your schema
                'title' => $faker->sentence,
                'desc' => $faker->text(100),
                'price' => rand(500, 1000),
                'tour_image' => 'storage/tours/' . $image,
                'passenger' => rand(4, 12),
                'luggage' => rand(2, 6),
            ]);

            // Attach 2–4 random locations to the tour (many-to-many)
            $randomLocations = $locations->random(rand(2, 4));

            // Insert manually with the 'id' field
            foreach ($randomLocations as $location) {
                DB::table('tour_locations')->insert([
                    'tour_id' => $tour->id,
                    'location_id' => $location->id,
                    'id' => DB::table('tour_locations')->max('id') + 1, // Get the next available ID
                ]);
            }
        }
    }
}
