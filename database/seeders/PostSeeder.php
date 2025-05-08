<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;
use Faker\Factory as Faker;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 10) as $i) {
            $image = $faker->image(storage_path('app/public/posts'), 1280, 720, null, false);

            Post::create([
                'category_id' => rand(1, 5),
                'title' => $faker->sentence,
                'slug' => $faker->slug,
                'hero_image' => 'storage/posts/' . $image,
                'content' => $faker->paragraph(5),
                'published_at' => now(),
            ]);
        }
    }
}
