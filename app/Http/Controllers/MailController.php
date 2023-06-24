<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;
use App\Mail\DoctorEmail;
use App\Models\User;

class MailController extends Controller
{
    public function index(Request $request) {
        $mailData = [
            'title' => 'Mail from Cancer Companion',
            'body' => $request->explain,
            'user' => auth()->user()
        ];

        $users = User::all();
        foreach ($users as $user) {
            foreach ($user->roles as $role) {
                if ($role->name == 'doctor' && $user->couldHelp == 1)
                    Mail::to($user->email)->send(new DoctorEmail([
                        'doctor' => $user,
                        'mailData' => $mailData
                    ]));
            }
        }

        return response()->json(['message' => 'you are doing good', 'data' => $request->explain]);
    }
}
