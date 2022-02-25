<?php

use Illuminate\Database\Seeder;

class LocationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("locations")->insert([
            "name" => "札幌",
            "name_id" => "2128295",
            "created_at" => new Datetime(),
            "updated_at" => new Datetime(),
        ]);
        DB::table("locations")->insert([
            "name" => "函館",
            "name_id" => "2130188",
            "created_at" => new Datetime(),
            "updated_at" => new Datetime(),
        ]);
        DB::table("locations")->insert([
            "name" => "所沢",
            "name_id" => "1850181",
            "created_at" => new Datetime(),
            "updated_at" => new Datetime(),
        ]);
        DB::table("locations")->insert([
            "name" => "春日部",
            "name_id" => "1859884",
            "created_at" => new Datetime(),
            "updated_at" => new Datetime(),
        ]);
        DB::table("locations")->insert([
            "name" => "八王子",
            "name_id" => "1863440",
            "created_at" => new Datetime(),
            "updated_at" => new Datetime(),
        ]);
        DB::table("locations")->insert([
            "name" => "横浜",
            "name_id" => "1848354",
            "created_at" => new Datetime(),
            "updated_at" => new Datetime(),
        ]);
        DB::table("locations")->insert([
            "name" => "相模原",
            "name_id" => "1853295",
            "created_at" => new Datetime(),
            "updated_at" => new Datetime(),
        ]);
    }
}
