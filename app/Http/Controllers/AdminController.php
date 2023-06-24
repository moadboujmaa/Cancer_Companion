<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index() {
        $roles = [];
        if (auth()->user()) $roles = auth()->user()->roles;
        return Inertia::render('Dashboard/Dashboard', [
            'roles' => $roles
        ]);
    }
}
