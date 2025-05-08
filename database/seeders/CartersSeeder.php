<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Carter;
use Faker\Factory as Faker;

class CartersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 30) as $index) {
            Carter::create([
                'car_id' => rand(1, 10),
                'location_id' => rand(1, 10),
                'price' => rand(1000000, 3000000),
            ]);
        }
    }
}
