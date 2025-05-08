<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tour;
use Faker\Factory as Faker;

class ToursSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 50) as $index) {
            $image = $faker->image(storage_path('app/public/tours'), 1280, 720, null, false);

            Tour::create([
                'start' => rand(1, 10),
                'title' => $faker->sentence,
                'desc' => $faker->text(50),
                'price' => rand(1000000, 4000000),
                'tour_image' => 'storage/tours/' . $image,
                'passenger' => rand(1, 12),
                'luggage' => rand(1, 8),
            ]);
        }
    }
}
