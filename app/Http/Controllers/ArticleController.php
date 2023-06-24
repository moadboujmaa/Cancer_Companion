<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index() {
        auth()->user()->load('roles');
        $articles = Article::where('status', 'accepted')->get()->load('user');
        return Inertia::render('Articles/Article', [
            'articles' => $articles
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'link' => 'required|url'
        ]);
        Article::create([
            'title' => $request->title,
            'link' => $request->link,
            'user_id' => auth()->user()->id,
            'status' => 'pending'
        ]);
        return response()->json(["message" => 'Article added to favorite']);
    }

    public function adminIndex() {
        dd('here');
        return Inertia::render('Dashboard/Article');    }
}
