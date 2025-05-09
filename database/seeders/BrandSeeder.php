<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Brand;
use Faker\Factory as Faker;
use Illuminate\Support\Str;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $directory = public_path('storage/brands');

        foreach (range(1, 10) as $index) {
            $imageName = Str::random(10) . '.jpg';
            $imagePath = $directory . '/' . $imageName;
            $imageContent = file_get_contents("https://loremflickr.com/400/400/logo");
            file_put_contents($imagePath, $imageContent);

            Brand::create([
                'name' => $faker->company,
                'brand_logo' => 'storage/brands/' . $imageName,
            ]);
        }
    }
}
