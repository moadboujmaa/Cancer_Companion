<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Answer;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        auth()->user()->load('roles');
        $question = Question::where('id', $request->id)->with('user', 'answers.user')->get();
        return Inertia::render('Answers/Answer', [
            'question' => $question
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        auth()->user()->load('roles');
        $request->validate([
            'content' => 'required|string|max:500'
        ]);
        Answer::create([
            'user_id' => auth()->user()->id,
            'question_id' => $request->question_id,
            'content' => $request->content
        ]);
        return to_route('answer.index', $request->question_id);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
