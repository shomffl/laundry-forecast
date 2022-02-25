<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("users")->insert([
            "name" => "sho",
            "email" => "sho@gmail.com",
            "password" => Hash::make("showatanabe"),
            "created_at" => new Datetime(),
            "updated_at" => new Datetime(),
        ]);
        DB::table("users")->insert([
            "name" => "shomffl",
            "email" => "shomffl@gmail.com",
            "password" => Hash::make("20010226"),
            "created_at" => new Datetime(),
            "updated_at" => new Datetime(),
        ]);
    }
}
