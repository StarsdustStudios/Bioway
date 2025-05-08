<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ShuttleBus;
use Faker\Factory as Faker;

class ShuttleBusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (range(1, 50) as $index) {
            ShuttleBus::create([
                'from' => rand(1, 10),
                'to' => rand(1, 10),
                'car_id' => rand(1, 10),
                'price' => rand(1000000, 5000000),
            ]);
        }
    }
}
