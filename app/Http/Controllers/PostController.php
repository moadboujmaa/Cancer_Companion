<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PostController extends Controller
{
    public function store(Request $request) {
        $request->validate([
            'content' => 'required',
            'image' => 'file|mimes:jpg,png,jfif,svg'
        ]);
        $uuid = Str::uuid()->toString();
        $imageName = 'posts/'.time().'-'.$uuid.'.'.$request->image->extension();
        $request->image->move(public_path('posts'), $imageName);
        
        Post::create([
            'image' => $imageName,
            'content' => $request->content,
            'user_id' => auth()->user()->id,
            'like_nb' => 0
        ]);

        return to_route('home');
    }

    // Ajax requests
    public function increment_like(Request $request) {
        $post = Post::find($request->post_id);
        $post->increment('like_nb');
        $post->save();
        Like::create([
            'user_id' => auth()->user()->id,
            'post_id' => $request->post_id
        ]);
        return response()->json("message", "you like a post")->status(200);
    }
    public function decrement_like(Request $request) {
        $post = Post::find($request->post_id);
        $post->decrement('like_nb');
        $post->save();
        Like::where('user_id', $request->user_id)
            ->where('post_id', $request->post_id)
            ->delete();
        return response()->json("message", "you remove a like from a post")->status(200);
    }
    public function add_comment (Request $request) {
        Comment::create([
            'content' => $request->comment,
            'user_id' => auth()->user()->id,
            'post_id' => $request->post_id
        ]);
        return response()->json('message', 'Your comment was added');
    }
}
