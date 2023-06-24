<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index() {
        $roles = [];
        if (auth()->user()) {
            $roles = auth()->user()->roles;
        }
        return Inertia::render('chat/Index', [
            'roles' => $roles
        ]);
    }
}
