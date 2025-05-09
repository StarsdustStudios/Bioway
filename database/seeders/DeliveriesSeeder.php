<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Delivery;
use Faker\Factory as Faker;

class DeliveriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 30) as $index) {
            Delivery::create([
                'location_id' => rand(1, 10),
                'size' => ['S', 'M', 'L'][rand(0, 2)],
                'price' => rand(100000, 500000),
            ]);
        }
    }
}
