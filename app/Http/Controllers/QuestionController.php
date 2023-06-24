<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller
{
    public function index() {
        auth()->user()->load('roles', 'likes');
        $questions = Question::with('user', 'answers')->get();
        return Inertia::render('Questions/Question', [
            'questions' =>$questions
        ]);
    }

    public function store(Request $request) {
        auth()->user()->load('roles');
        $request->validate([
            'content' => 'required|string|max:500'
        ]);
        Question::create([
            'user_id' => auth()->user()->id,
            'content' => $request->content
        ]);
        $questions = Question::with('user')->get();
        return Inertia::render('Questions/Question', [
            'questions' =>$questions
        ]);
    }
}
