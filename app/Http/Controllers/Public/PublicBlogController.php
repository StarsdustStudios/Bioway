<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;


class PublicBlogController extends Controller 
{
    public function index()
    {
        $events = Event::get()->map(function ($event) {
            $event->poster_img = asset('storage/' . $event->poster_img);
            return $event;
        });

        $posts = Post::with('category')->get()->map(function ($post) {
            $post->hero_image = asset('storage/' . ltrim($post->hero_image, '/storage/'));
            unset($post->content); // Remove the 'content' attribute
            return $post;
        });

        return Inertia::render('Main/Blog/Blog', [
            'events' => $events,
            'posts' => $posts
        ]);
    }

    public function show($slug)
    {
        $blog = Post::where('slug', $slug)->firstOrFail();
        $blog->hero_image = asset('storage/' . ltrim($blog->hero_image, '/storage/'));
        $blog->content = $blog->content; // Convert Markdown to HTML


        $events = Event::get()->map(function ($event) {
            $event->poster_img = asset('storage/' . $event->poster_img);
            return $event;
        });

        $posts = Post::with('category')->get()->map(function ($post) {
            $post->hero_image = asset('storage/' . ltrim($post->hero_image, '/storage/'));
            unset($post->content); // Remove the 'content' attribute
            return $post;
        });

        return Inertia::render('Main/Blog/BlogDetail', [
            'openedBlog' => $blog,
            'events' => $events,
            'posts' => $posts
        ]);
        
        // return response()->json([
        //     'blog' => $blog,
        //     'events' => $events,
        //     'posts' => $posts
        // ]);
    }
}