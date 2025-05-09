<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Brand;
use Faker\Factory as Faker;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 10) as $index) {
            $image = $faker->image(storage_path('storage/brands'), 400, 400, null, false);

            Brand::create([
                'name' => $faker->company,
                'brand_logo' => 'storage/brands/' . $image,
            ]);
        }
    }
}
