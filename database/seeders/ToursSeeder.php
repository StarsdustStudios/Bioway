<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tour;
use Faker\Factory as Faker;
use App\Models\Location;
use DB;
use Illuminate\Support\Str;


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
        $directory = public_path('storage/tours');

        foreach (range(1, 5) as $i) {
            $imageName = Str::random(10) . '.jpg';
            $imagePath = $directory . '/' . $imageName;
            $imageContent = file_get_contents("https://loremflickr.com/1920/1080/logo");
            file_put_contents($imagePath, $imageContent);

            // Create tour record
            $tour = Tour::create([
                'start' => rand(1, 10), // Change based on your schema
                'title' => $faker->sentence,
                'desc' => $faker->text(100),
                'price' => rand(500, 1000),
                'tour_image' => 'storage/tours/' . $imageName,
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
