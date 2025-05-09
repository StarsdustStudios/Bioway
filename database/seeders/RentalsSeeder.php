<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Rental;
use Faker\Factory as Faker;

class RentalsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 100) as $index) {
            Rental::create([
                'car_id' => rand(1, 10),
                'location_id' => rand(1, 10),
                'price' => rand(1000000, 3000000),
                'driver_fee' => rand(100000, 300000),      
            ]);
        }
    }
}
