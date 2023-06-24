<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'email_verified_at' => now(),
            'gender' => $faker->randomElement(['male', 'female']),
            'country' => $faker->country(),
            'avatar' => 'profile.jpg',
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        ])->assignRole('admin', 'doctor', 'sick', 'notSick');
        User::create([
            'name' => 'doctor1',
            'email' => 'seinsisaitama@gmail.com',
            'avatar' => 'profile.jpg',
            'gender' => $faker->randomElement(['male', 'female']),
            'country' => $faker->country(),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        ])->assignRole('doctor');
        User::create([
            'name' => 'doctor2',
            'email' => 'moadboujmaa@gmail.com',
            'avatar' => 'profile.jpg',
            'gender' => $faker->randomElement(['male', 'female']),
            'country' => $faker->country(),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        ])->assignRole('doctor');
        User::create([
            'name' => 'sick',
            'email' => 'sick@gmail.com',
            'avatar' => 'profile.jpg',
            'gender' => $faker->randomElement(['male', 'female']),
            'country' => $faker->country(),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        ])->assignRole('sick');
        User::create([
            'name' => 'notSick',
            'email' => 'notsick@gmail.com',
            'avatar' => 'profile.jpg',
            'gender' => $faker->randomElement(['male', 'female']),
            'country' => $faker->country(),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        ])->assignRole('notSick');
    }
}
