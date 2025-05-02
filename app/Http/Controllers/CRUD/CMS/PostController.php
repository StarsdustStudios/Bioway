<?php

namespace App\Http\Controllers\CRUD\CMS;

use App\Http\Controllers\Controller;
use App\Http\Requests\CMS\PostRequest;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('category')->get()->map(function ($post) 
        {
            $post->hero_image = asset('storage/' . ltrim($post->hero_image, '/storage/'));
            return $post;
        });

        return Inertia::render('Admin/Dashboard', [
            'posts' => $posts,
            'categories' => Category::get(),
        ]);
 
    }

    public function store(PostRequest $request)
    {
        $post = new Post();
        $post->category_id = $request->category_id;
        $post->title = $request->title;
        $post->slug = $request->slug;
        $post->content = $request->content;
        $post->published_at = now();

        $imagePath = 'posts/placeholder.png';

        if ($request->hasFile('hero_image')) {
            $imagePath = $request->file('hero_image')->store('posts', 'public');
        }

        $post->hero_image = $imagePath;
        $post->save();

        return redirect()->back()->with('success', 'Post created successfully!');
    }

    public function update(PostRequest $request)
    {
        $post = Post::find($request->id);

        if (!$post) {
            return redirect()->back()->withErrors(['Post not found']);
        }

        $post->category_id = $request->category_id;
        $post->title = $request->title;
        $post->slug = $request->slug;
        $post->content = $request->content;

        $imagePath = $post->hero_image;
        if ($request->hasFile('hero_image')) {
            $imagePath = $request->file('hero_image')->store('posts', 'public');
        }

        $post->hero_image = $imagePath;
        $post->save();

        return redirect()->back()->with('success', 'Post updated successfully!');
    }

    public function destroy(Post $post)
    {
        $path = str_replace('/storage/', '', $post->hero_image);
        Storage::disk('public')->delete($path);
        $post->delete();

        $posts = Post::with('category')->get()->map(function ($post) {
            $post->hero_image = asset('storage/' . ltrim($post->hero_image, '/storage/'));
            return $post;
        });

        return Inertia::render('Admin/Dashboard', [
            'message' => 'Post deleted successfully!',
            'posts' => $posts,
            'categories' => Category::get(),
        ]);
    }
}
