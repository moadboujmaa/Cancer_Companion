<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'gender',
        'country',
        'avatar',
        'couldHelp'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function description() {
        return $this->hasOne(Description::class);
    }
    public function posts() {
        return $this->hasMany(Post::class);
    }
    public function likes() {
        return $this->hasMany(Like::class);
    }
    public function comments() {
        return $this->hasMany(Comment::class);
    }
    public function questions() {
        return $this->hasMany(Question::class);
    }
    public function answers() {
        return $this->hasMany(Answer::class);
    }
    public function quotes() {
        return $this->hasMany(Quote::class);
    }
    public function articles() {
        return $this->hasMany(Article::class);
    }
    public function banner() {
        return $this->hasOne(Banner::class);
    }
}
