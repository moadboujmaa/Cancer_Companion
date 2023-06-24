<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
    public function index() {
        auth()->user()->load('roles', 'likes');
        $posts = Post::with('comments', 'user', 'likes')->get();
        $liked_posts = Like::where('user_id', auth()->user()->id)->with('post')->get();

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'posts' => $posts,
            'liked_posts' => $liked_posts,
        ]);
    }
}
