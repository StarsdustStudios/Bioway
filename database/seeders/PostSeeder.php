<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;
use Faker\Factory as Faker;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $directory = public_path('storage/posts');

        foreach (range(1, 40) as $i) {
            $imageName = Str::random(10) . '.jpg';
            $imagePath = $directory . '/' . $imageName;
            $imageContent = file_get_contents("https://loremflickr.com/1280/720/nature");
            file_put_contents($imagePath, $imageContent);


            $content = '';
            $content .= "<h1>" . $faker->sentence(rand(3, 6)) . "</h2>";
            $content .= "<p>" . $faker->paragraph(rand(2, 4)) . "</p>";

            $content .= "<h2>" . $faker->sentence(rand(3, 6)) . "</h2>";
            $content .= "<p>" . $faker->paragraph(rand(2, 4)) . "</p>";

            $content .= "<h3>" . $faker->sentence(rand(3, 6)) . "</h2>";
            $content .= "<ul>";
            foreach (range(1, 3) as $j) {
                $content .= "<li>" . $faker->sentence(rand(6, 12)) . "</li>";
            }
            $content .= "</ul>";

            Post::create([
                'category_id' => rand(1, 5),
                'title' => $faker->sentence,
                'slug' => $faker->slug,
                'hero_image' => 'storage/posts/' . $imageName,
                'content' => $content,
                'published_at' => now(),
            ]);
        }
    }
}
