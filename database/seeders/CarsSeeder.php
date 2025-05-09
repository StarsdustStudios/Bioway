<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Car;
use Faker\Factory as Faker;
use Illuminate\Support\Str;

class CarsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $directory = public_path('storage/cars');

        foreach (range(1, 20) as $index) {
            $imageName = Str::random(10) . '.jpg';
            $imagePath = $directory . '/' . $imageName;
            $imageContent = file_get_contents("https://loremflickr.com/1280/1080/car");
            file_put_contents($imagePath, $imageContent);

            Car::create([
                'model' => $faker->word,
                'brand_id' => rand(1, 10),
                'car_image' => 'storage/cars/' . $imageName,
                'luggage' => rand(1, 5),
                'seat' => rand(1, 5),
            ]);
        }
    }
}
