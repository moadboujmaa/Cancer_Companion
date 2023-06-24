<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reminder extends Model
{
    use HasFactory;

    protected $fillable = [
        'medicine',
        'type',
        'nb_times',
        'first_time',
        'second_time',
        'third_time',
    ];
}
