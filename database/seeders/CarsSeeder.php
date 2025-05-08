<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Car;
use Faker\Factory as Faker;

class CarsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 10) as $index) {
            $image = $faker->image(storage_path('app/public/cars'), 1280, 720, null, false);

            Car::create([
                'model' => $faker->word,
                'brand_id' => $faker->rand(1, 10),
                'car_image' => 'storage/cars/' . $image,
                'luggage' => rand(1, 5),
                'seat' => rand(1, 5),
            ]);
        }
    }
}
