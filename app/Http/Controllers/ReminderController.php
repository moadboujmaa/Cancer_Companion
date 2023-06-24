<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReminderController extends Controller
{
    public function index() {
        auth()->user()->load('roles', 'likes');
        return Inertia::render('reminder/Reminder');
    }
}
