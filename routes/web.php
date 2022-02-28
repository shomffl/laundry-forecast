<?php
use App\Http\Controllers\LocationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WeatherController;


Auth::routes();

Route::group(["middleware" => ["auth"]], function(){
    
    Route::get("locations/get", "LocationController@get");
    Route::post("locations/store", "LocationController@store");

    Route::get("user/get", "UserController@get");

    Route::post("weather/get", "WeatherController@get");


    Route::get('/{any}', function () {
        return view('index');
    })->where("any", ".*");
});

