<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReminderController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\UrgentCaseController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::middleware('auth')->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
    // User profile routes
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Posts Routes
    Route::post('/post', [PostController::class, 'store'])->name('post.store');
    
    // Reminder Routes
    Route::get('/reminder', [ReminderController::class, 'index'])->name('reminder.index');
    
    // Questions route
    Route::get('/q', [QuestionController::class, 'index'])->name('question.index');
    Route::post('/q', [QuestionController::class, 'store'])->name('question.store');
    
    // Answers routes
    Route::get('/q/{id}/answers', [AnswerController::class, 'index'])->name('answer.index');
    Route::post('/q/{id}/answers', [AnswerController::class, 'store'])->name('answer.store');
    
    // Quote routes
    Route::get('/quotes', [QuoteController::class, 'index'])->name('quote.index');
    Route::post('/quote/fav', [QuoteController::class, 'store'])->name('quote.store');
    
    // Urgent case 
    Route::get('/urgent', [UrgentCaseController::class, 'index'])->name('urgent.index');
    Route::post('/urgent-mail', [MailController::class, 'index'])->name('urgent.mail');
    // Route::post('/chat/{id}', [MailController::class, 'index'])->name('urgent.mail');
    
    // Articles routes
    Route::get('/articles', [ArticleController::class, 'index'])->name('article.index');
    Route::post('/article', [ArticleController::class, 'store'])->name('article.store');
    
    // Ajax routes
    Route::post('/post/increment', [PostController::class, 'increment_like'])->name('like.increment');
    Route::post('/post/decrement', [PostController::class, 'decrement_like'])->name('like.decrement');
    Route::post('/comment', [PostController::class, 'add_comment'])->name('add.comment');
});

Route::middleware(['auth', 'role:admin'])->prefix('dashboard')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
    Route::get('/article', [ArticleController::class, 'adminIndex'])->name('dashboard.show.article');
});

require __DIR__.'/auth.php';
